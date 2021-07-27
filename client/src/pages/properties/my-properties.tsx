import { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import Link from 'next/link';
import { SessionContext } from '../../pages/_app';

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
      {propertiesData.length === 0 ? (
        <p>No properties.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              {Object.keys(propertiesData[0]).map((field, i) => (
                <th key={i}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propertiesData.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((field, i) => (
                  <td key={i}>{row[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
