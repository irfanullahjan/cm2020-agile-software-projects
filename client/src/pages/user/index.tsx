import { useContext } from 'react';
import { SessionContext } from '../_app';
import Error from 'next/dist/pages/_error';
import { Table } from 'reactstrap';

const title = 'User account information';

export default function UserAccountInfo() {
  const { user } = useContext(SessionContext);

  if (!user)
    return (
      <Error
        statusCode={401}
        title="Please login to see user account details"
      />
    );

  return (
    <>
      <h2>Account details</h2>
      <Table dark>
        <tbody>
          {Object.keys(user).map((key, i) => (
            <tr key={i}>
              <td className="text-capitalize">{key}</td>
              <td style={{ wordBreak: 'break-all' }}>{user[key]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

UserAccountInfo.title = title;
