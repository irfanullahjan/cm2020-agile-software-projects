import { PropertyForm } from 'components/PropertyForm';
import { SessionContext } from '../../pages/_app';
import { useContext } from 'react';

export default function AddProperty() {
  const { user } = useContext(SessionContext);
  if (!user) return <p>Unauthorized!!</p>;
  return (
    <>
      <h1>Add property</h1>
      <PropertyForm />
    </>
  );
}
