import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { SessionContext } from '../_app';
import { useContext, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { getAsString } from 'utils/getAsString';
import Error from 'next/error';

const title = 'Report property';

export default function ReportProperty() {
  const { user } = useContext(SessionContext);
  const router = useRouter();
  const id = +getAsString(router.query.id);

  const [formFeedback, setFormFeedback] = useState<{
    accent: string;
    message: string;
  }>();

  if (!user)
    return (
      <Error
        statusCode={401}
        title="Sorry! You need to be logged in to access this page."
      />
    );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: '',
      propertyId: id,
      userId: user.id,
    },
    onSubmit: async values => {
      try {
        const res = await fetch('/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const json = await res.json();
        if (json?.id) {
          setFormFeedback({
            accent: 'success',
            message:
              'Reported the property successfully. Redirecting you to home page.',
          });
          setTimeout(() => router.push('/'), 1000);
        } else {
          throw res;
        }
      } catch (err) {
        setFormFeedback({
          accent: 'danger',
          message: 'Submission failed due to a network or server issue.',
        });
        console.error(err);
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
          <Button type="submit" color="primary">
            Report {formik.isSubmitting && <Spinner size="sm" color="light" />}
          </Button>
          {formFeedback && (
            <p className={`text-${formFeedback.accent} mt-3`}>
              {formFeedback.message}
            </p>
          )}
        </Form>
      </FormikProvider>
    </>
  );
}

ReportProperty.title = title;
