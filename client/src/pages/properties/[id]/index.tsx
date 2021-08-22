import { Spinner } from 'components/lib/Spinner';
import { useRouter } from 'next/dist/client/router';
import { SessionContext } from '../../../pages/_app';
import { useContext, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import Link from 'next/link';

export default function ViewProperty() {
  const { user } = useContext(SessionContext);

  const router = useRouter();
  const { id } = router.query;

  type Property = { [key: string]: string };
  const [property, setProperty] = useState<Property | undefined>(undefined);
  useEffect(() => {
    if (+getAsString(id) > 0) {
      fetch(`/api/properties/${id}`)
        .then(res => res.json())
        .then(json => setProperty(json));
    }
  }, [id]);
  if (!property) return <Spinner />;
  return (
    <>
      <h1>View Property</h1>
      <Table>
        <tbody>
          {Object.keys(property).map((key, i) => (
            <tr key={i}>
              <td>{key}</td>
              <td>{property[key]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {user &&
        (user.id === property.userId ? (
          <Link href={`/properties/${property.id}/edit`} passHref>
            <a className="btn btn-secondary">Edit</a>
          </Link>
        ) : (
          <Link href={`/properties/${property.id}/report`} passHref>
            <a className="btn btn-secondary">Report</a>
          </Link>
        ))}
    </>
  );
}
