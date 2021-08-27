import { useRouter } from 'next/router';
import { SessionContext } from '../../../pages/_app';
import { useContext, useEffect, useState } from 'react';
import { getAsString } from 'utils/getAsString';
import { Spinner } from 'components/lib/Spinner';
import { Button } from 'reactstrap';

export default function ReportedProperty() {
  const { user } = useContext(SessionContext);

  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<any>();
  useEffect(() => {
    if (+getAsString(id) > 0) {
      fetch(`/api/properties/${id}?filter[include][]=reports`)
        .then(res => res.json())
        .then(json => setProperty(json));
    }
  }, [id]);
  if (user?.realm !== 'admin') return <p>Unauthorized!!</p>;
  if (!property) return <Spinner />;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this property?')) {
      fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      router.push('/reports');
    }
  };
  return (
    <>
      <h1>Reports: Property {id}</h1>
      <ul>
        {property?.reports?.map((report: any, i: number) => (
          <li key={i}>{report.reason}</li>
        ))}
      </ul>
      <p>Based on the above complaints you may delete this property.</p>
      <Button onClick={handleDelete} color="danger">
        Delete property
      </Button>
    </>
  );
}
