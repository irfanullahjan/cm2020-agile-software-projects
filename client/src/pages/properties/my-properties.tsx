import { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import Link from 'next/link';
import { SessionContext } from '../../pages/_app';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';

export default function Properties() {
  const { user, updateSession } = useContext(SessionContext);
  if (!user) return <p>Unauthorized!</p>;
  const [propertiesData, setPropertiesData] =
    useState<{ [key: string]: string }[] | undefined>(undefined);
  useEffect(() => {
    fetch('/api/user/properties', {
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
  }, [user]);
  if (propertiesData === undefined) return <Spinner />;
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
