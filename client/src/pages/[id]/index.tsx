import { Spinner } from 'components/lib/Spinner';
import { useRouter } from 'next/dist/client/router';
import { SessionContext } from '../_app';
import { useContext } from 'react';
import { Badge, Table } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import Error from 'next/error';
import { format } from 'date-fns';

const title = 'View property';

export default function ViewProperty() {
  const { user } = useContext(SessionContext);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: property,
    error,
    isValidating,
  } = useSWR(
    id ? `/api/properties/${getAsString(id)}?filter[include][]=user` : null,
    fetcher,
  );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  return (
    <>
      <h1>View Property</h1>
      {isValidating && <Spinner />}
      {property && (
        <>
          <Table className="table-secondary">
            <thead>
              <tr>
                <th scope="col" className="w-25">
                  Item
                </th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Title</th>
                <td>{property.title}</td>
              </tr>
              <tr>
                <th scope="row">Type</th>
                <td className="text-capitalize">{property.type}</td>
              </tr>
              <tr>
                <th scope="row">Offer</th>
                <td>{`For ${property.offer}`}</td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>
                  {`$${property.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                </td>
              </tr>
              <tr>
                <th scope="row">Area</th>
                <td>{property.area} square meters</td>
              </tr>
              <tr>
                <th scope="row">Posted on</th>
                <td>
                  {format(
                    Date.parse(property.createStamp),
                    'yyyy-MM-dd EEEE h:mm a',
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Updated on</th>
                <td>
                  {format(
                    Date.parse(property.updateStamp),
                    'yyyy-MM-dd EEEE h:mm a',
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Available from</th>
                <td>
                  {format(
                    Date.parse(property.dateAvailable),
                    'yyyy-MM-dd EEEE',
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{property.description}</td>
              </tr>
              <tr>
                <th scope="row">Posted by</th>
                <td>
                  <Link href={`/user/${property.user.id}`}>
                    {property.user.username}
                  </Link>{' '}
                  {property.user.realm === 'verified' && (
                    <Badge color="success">Verified</Badge>
                  )}
                  {property.user.realm === 'admin' && (
                    <Badge color="info">Admin</Badge>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          {user &&
            (user.id === property?.userId ? (
              <Link href={`/${property.id}/edit`} passHref>
                <a className="btn btn-secondary">Edit</a>
              </Link>
            ) : (
              <Link href={`/${property?.id}/report`} passHref>
                <a className="btn btn-secondary">Report</a>
              </Link>
            ))}
        </>
      )}
    </>
  );
}

ViewProperty.title = title;
