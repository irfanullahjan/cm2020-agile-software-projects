import { useRouter } from 'next/dist/client/router';
import { SessionContext } from '../_app';
import { useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import { Spinner } from 'components/lib/Spinner';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';
import Error from 'next/dist/pages/_error';

const title = 'Selected user properties';

export default function UserByIdProperties() {
  const { user } = useContext(SessionContext);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: properties,
    error,
    isValidating,
  } = useSWR(
    id
      ? `/api/properties?filter[where][userId]=${id}&filter[include][]=user`
      : null,
    fetcher,
  );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  return (
    <>
      <h1>{`User properties${
        properties?.length > 0 ? `: ${properties[0].user.username}` : ''
      }`}</h1>
      {isValidating && <Spinner />}
      {properties && (
        <>
          {properties.length > 0 ? (
            <PropertiesGrid
              properties={properties}
              editable={id === user?.id}
            />
          ) : (
            <p>This user has no properties.</p>
          )}
        </>
      )}
    </>
  );
}

UserByIdProperties.title = title;
