import { useEffect, useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import Link from 'next/link';

export default function Properties() {
  const [propertiesData, setPropertiesData] = useState([]);
  useEffect(() => {
    fetch('/api/properties')
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
  }, []);
  if (propertiesData?.length === 0) return <Spinner />;
  return (
    <>
      <h1>Properties</h1>
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
    </>
  );
}
