import { SessionContext } from '../../pages/_app';
import { useContext } from 'react';
import { Table } from 'reactstrap';
import { Spinner } from 'components/lib/Spinner';
import Link from 'next/link';
import useSwr from 'swr';
import { fetcher } from 'utils/fetcher';
import Error from 'next/error';

export default function ReportedProperties() {
  const { user } = useContext(SessionContext);
  const {
    data: reportedProperties,
    error,
    isValidating,
  } = useSwr('/api/reported-properties', fetcher);

  if (user?.realm !== 'admin')
    return (
      <Error
        statusCode={401}
        title="Sorry! You are not authorized to view this page."
      />
    );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  reportedProperties?.sort(
    (a: any, b: any) => b.reports.length - a.reports.length,
  );

  return (
    <>
      <h1>Reports</h1>
      {isValidating && <Spinner />}
      {reportedProperties?.length > 0 ? (
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
            {reportedProperties.map((property: any, i: number) => (
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
      ) : (
        <p>No reports.</p>
      )}
    </>
  );
}
