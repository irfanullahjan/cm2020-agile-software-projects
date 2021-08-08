import { useRouter } from 'next/dist/client/router';
import { Spinner } from 'components/lib/Spinner';
import { getAsString } from 'utils/getAsString';
import { PropertyForm } from 'components/PropertyForm';

export default function EditProperty() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <Spinner />;
  return (
    <>
      <h1>Edit property</h1>
      <PropertyForm propertyId={+getAsString(id)} />
    </>
  );
}
