import { useContext } from 'react';
import { SessionContext } from '../_app';
import Error from 'next/dist/pages/_error';
import { Table } from 'reactstrap';

export default function CurrentUserProperties() {
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
        {Object.keys(user).map((key, i) => (
          <tr key={i}>
            <td className="text-capitalize">{key}</td>
            <td style={{ wordBreak: 'break-all' }}>{user[key]}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
