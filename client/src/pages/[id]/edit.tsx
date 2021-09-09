import { useRouter } from 'next/dist/client/router';
import { Spinner } from 'components/lib/Spinner';
import { getAsString } from 'utils/getAsString';
import { PropertyForm } from 'components/PropertyForm';
import { useContext } from 'react';
import { SessionContext } from '../../pages/_app';
import Error from 'next/dist/pages/_error';

const title = 'Edit property';

export default function EditProperty() {
  const { user } = useContext(SessionContext);
  const router = useRouter();
  const { id } = router.query;

  if (!user)
    return <Error statusCode={401} title="Please login to edit the property" />;

  if (!id) return <Spinner />;
  return (
    <>
      <h1>Edit property</h1>
      <PropertyForm propertyId={+getAsString(id)} />
    </>
  );
}

EditProperty.title = title;
