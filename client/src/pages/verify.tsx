import { Spinner } from 'components/lib/Spinner';
import { useContext, useState } from 'react';
import { Badge, Button, Table } from 'reactstrap';
import { SessionContext } from './_app';
import Error from 'next/dist/pages/_error';
import useSWR, { mutate } from 'swr';
import { fetcher } from 'utils/fetcher';

const title = 'Verify user accounts';

export default function VerifyUsers() {
  const { user } = useContext(SessionContext);

  const { data, error, isValidating } = useSWR('/api/user/all', fetcher);

  const users = data?.filter((user: any) => user.realm !== 'admin');

  const setUserRealm = (userId: string, realm: string) => {
    fetch(`/api/user/realm/${userId}/${realm}`).then(() =>
      mutate('/api/user/all'),
    );
  };

  if (user?.realm !== 'admin')
    return (
      <Error
        statusCode={401}
        title="Please log in as an admin to access this page"
      />
    );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  return (
    <>
      <h1>Verify users</h1>
      {users?.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th className="w-25">Username</th>
              <th className="w-25">Email</th>
              <th className="w-25">Realm</th>
              <th className="w-25"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, i: number) => (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.realm === 'verified' ? (
                    <Badge color="success">Verified</Badge>
                  ) : (
                    <Badge color="danger">Unverified</Badge>
                  )}
                </td>
                <td>
                  {user.realm &&
                    user.realm !== 'admin' &&
                    (user.realm === 'unverified' ? (
                      <Button onClick={() => setUserRealm(user.id, 'verified')}>
                        Set Verified
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setUserRealm(user.id, 'unverified')}>
                        Set Unverified
                      </Button>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {isValidating && <Spinner />}
    </>
  );
}

VerifyUsers.title = title;
