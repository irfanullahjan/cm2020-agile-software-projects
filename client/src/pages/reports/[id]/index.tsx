import { useRouter } from 'next/router';
import { SessionContext } from '../../../pages/_app';
import { useContext } from 'react';
import { getAsString } from 'utils/getAsString';
import { Spinner } from 'components/lib/Spinner';
import { Button, Table } from 'reactstrap';
import { fetcher } from 'utils/fetcher';
import useSWR from 'swr';
import Error from 'next/error';
import format from 'date-fns/format';
import Link from 'next/link';

const title = 'Reported property';

export default function ReportedProperty() {
  const { user } = useContext(SessionContext);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: reports,
    error,
    isValidating,
  } = useSWR(
    id
      ? `/api/reports?filter[where][propertyId]=${getAsString(
          id,
        )}&filter[include][]=user`
      : null,
    fetcher,
  );

  if (user?.realm !== 'admin')
    return (
      <Error
        statusCode={401}
        title="Sorry! You are not authorized to view this page."
      />
    );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this property?')) {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      if (res.status) {
        router.push('/reports');
      }
    }
  };

  return (
    <>
      <h1>Reports: Property {id}</h1>
      {isValidating && <Spinner />}
      {reports?.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <th className="w-25">Time</th>
                <th className="w-25">Reported by</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report: any, i: number) => (
                <tr key={i}>
                  <td>
                    {format(
                      Date.parse(report.createStamp),
                      'yyyy-MM-dd EEEE h:mm a',
                    )}
                  </td>
                  <td>
                    <Link href={`/user/${report.user.id}`}>
                      {report.user.username}
                    </Link>
                  </td>
                  <td>{report.reason}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Based on the above, you may delete this property.</p>
          <Button onClick={handleDelete} color="danger">
            Delete property
          </Button>
        </>
      ) : (
        <p>There are no reports against this property.</p>
      )}
    </>
  );
}

ReportedProperty.title = title;
