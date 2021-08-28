import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'components/lib/Spinner';
import Link from 'next/link';
import { SessionContext } from './_app';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';

export default function Properties() {
  const { user } = useContext(SessionContext);
  const [propertiesData, setPropertiesData] = useState<
    { [key: string]: string }[] | undefined
  >(undefined);
  useEffect(() => {
    if (user) {
      fetch(`/api/properties?filter[where][userId]=${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(res => res.json())
        .then(json =>
          setPropertiesData(
            json.map((item: { [key: string]: string }) => ({
              ...item,
              edit: <Link href={`/${item.id}/edit`}>{item.title}</Link>,
            })),
          ),
        );
    }
  }, [user]);
  if (propertiesData === undefined) return <Spinner />;
  if (!user) return <p>Unauthorized!</p>;
  return (
    <>
      <h1>User details</h1>
      <h2>Properties posted</h2>
      {propertiesData.length > 0 ? (
        <PropertiesGrid properties={propertiesData} editable />
      ) : (
        <p>No properties.</p>
      )}
      <h2>Account details</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
