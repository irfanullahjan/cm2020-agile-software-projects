import { useRouter } from 'next/router';
import { getAsString } from 'utils/getAsString';

export default function ReportProperty() {
  const router = useRouter();
  const id = +getAsString(router.query.id);
  return (
    <>
      <h1>Report property</h1>
    </>
  );
}
