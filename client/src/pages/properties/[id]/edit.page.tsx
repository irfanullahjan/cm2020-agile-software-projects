import { useRouter } from 'next/dist/client/router';
import { Spinner } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import { PropertyForm } from '../_components/PropertyForm';

export default function AddProperty() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <Spinner />;

  return (
    <>
      <PropertyForm propertyId={+getAsString(id)} />
    </>
  );
}
