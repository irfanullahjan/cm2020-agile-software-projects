import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { SessionContext } from '../_app';
import { useContext } from 'react';
import { Button } from 'reactstrap';
import { getAsString } from 'utils/getAsString';

const title = 'Report property';

export default function ReportProperty() {
  const { user } = useContext(SessionContext);
  if (!user) return <p>Unauthorized!!</p>;
  const router = useRouter();
  const id = +getAsString(router.query.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: '',
      propertyId: id,
      userId: user.id,
    },
    onSubmit: async values => {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json?.id) {
        router.push('/');
      } else {
        alert('Report creation failed.');
      }
    },
    validate: values => {
      let errors: FormikErrors<typeof values> = {};
      if (!values.reason) {
        errors.reason = 'Reason for reporting the property is required.';
      }
      return errors;
    },
  });

  return (
    <>
      <h1>Report property</h1>
      <FormikProvider value={formik}>
        <Form>
          <InputText
            type="textarea"
            name="reason"
            label={`Please explain why do you think property ${id} should be removed?`}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </FormikProvider>
    </>
  );
}

ReportProperty.title = title;
