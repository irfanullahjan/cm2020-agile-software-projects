import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'components/lib/Spinner';
import Link from 'next/link';
import { SessionContext } from '../../pages/_app';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';

export default function Properties() {
  const { user, updateSession } = useContext(SessionContext);
  const [propertiesData, setPropertiesData] =
    useState<{ [key: string]: string }[] | undefined>(undefined);
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
              edit: (
                <Link href={`/properties/${item.id}/edit`}>{item.title}</Link>
              ),
            })),
          ),
        );
    }
  }, [user]);
  if (propertiesData === undefined) return <Spinner />;
  if (!user) return <p>Unauthorized!</p>;
  return (
    <>
      <h1>My Properties</h1>
      {propertiesData.length > 0 ? (
        <PropertiesGrid properties={propertiesData} editable />
      ) : (
        <p>No properties.</p>
      )}
    </>
  );
}
