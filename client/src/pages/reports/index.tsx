import { SessionContext } from '../../pages/_app';
import { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Spinner } from 'components/lib/Spinner';
import Link from 'next/link';

export default function ReportedProperties() {
  const { user } = useContext(SessionContext);
  const [reportedProperties, setReportedProperties] = useState<any[]>();
  useEffect(() => {
    fetch('/api/reported-properties')
      .then(res => res.json())
      .then(json =>
        setReportedProperties(
          json.sort((a: any, b: any) => b.reports.length - a.reports.length),
        ),
      );
  }, []);
  if (user?.realm !== 'admin') return <p>Unauthorized!!</p>;
  if (!reportedProperties) return <Spinner />;
  console.log(reportedProperties);
  return (
    <>
      <h1>Reports</h1>
      <Table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Type</td>
            <td>Offer</td>
            <td>Reports</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {reportedProperties.map((property, i) => (
            <tr key={i}>
              <td>
                <Link href={`/reports/${property.id}`}>{property.title}</Link>
              </td>
              <td>{property.type}</td>
              <td>{property.offer}</td>
              <td>{property.reports.length}</td>
              <td>
                <Link href={`/reports/${property.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
