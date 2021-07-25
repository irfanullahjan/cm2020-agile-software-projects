import { useContext } from 'react';
import { SessionContext } from './_app';

export default function Home() {
  const { user, updateSession } = useContext(SessionContext);
  return (
    <>
      <h1>Homepage</h1>
      <p>Session:</p>
      {user ? (
        <div>
          <p>User is logged in.</p>
          <p>User details:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>User is logged out</p>
      )}
    </>
  );
}
