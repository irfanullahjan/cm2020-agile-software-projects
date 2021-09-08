import { PropertyForm } from 'components/PropertyForm';
import { SessionContext } from '../pages/_app';
import { useContext } from 'react';
import Error from 'next/dist/pages/_error';
import Head from 'next/head';

export default function AddProperty() {
  const { user } = useContext(SessionContext);

  if (!user)
    return (
      <Error statusCode={401} title="Please login to post a new property" />
    );

  return (
    <>
      <Head>
        <title>Add property</title>
      </Head>
      <h1>Add property</h1>
      <PropertyForm />
    </>
  );
}
