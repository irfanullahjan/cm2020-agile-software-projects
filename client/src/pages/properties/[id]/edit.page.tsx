import { useRouter } from 'next/dist/client/router';
import { Spinner } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import { PropertyForm } from '../_components/PropertyForm';

export default function AddProperty() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Spinner hidden={id ? false : true} />
      <PropertyForm propertyId={+getAsString(id)} />
    </>
  );
}
