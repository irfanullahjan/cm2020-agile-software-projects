import { Spinner } from 'components/lib/Spinner';
import { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import { SessionContext } from './_app';

export default function VerifyUsers() {
  const { user } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/user/all')
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setUsers(json);
      });
  };

  useEffect(fetchUsers, []);

  const setUserRealm = (userId: string, realm: string) => {
    fetch(`/api/user/realm/${userId}/${realm}`).then(fetchUsers);
  };

  if (user?.realm !== 'admin') return <p>Unauthorized!!</p>;
  return (
    <>
      <h1>Verify users</h1>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Realm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, i: number) => (
            <tr key={i}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.realm}</td>
              <td>
                {user.realm &&
                  user.realm !== 'admin' &&
                  (user.realm === 'unverified' ? (
                    <Button
                      color="success"
                      onClick={() => setUserRealm(user.id, 'verified')}>
                      Set Verified
                    </Button>
                  ) : (
                    <Button
                      color="danger"
                      onClick={() => setUserRealm(user.id, 'unverified')}>
                      Set Unverified
                    </Button>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading && <Spinner />}
    </>
  );
}
