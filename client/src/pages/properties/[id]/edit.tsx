import { useRouter } from 'next/dist/client/router';
import { Spinner } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import { PropertyForm } from '../../../common/components/PropertyForm';

export default function AddProperty() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {!id && <Spinner />}
      <PropertyForm propertyId={+getAsString(id)} />
    </>
  );
}
