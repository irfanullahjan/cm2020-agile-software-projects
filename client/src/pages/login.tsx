import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { SessionContext } from './_app';

const title = 'Login to EasyHomes';

export default function Login() {
  const { user, updateSession } = useContext(SessionContext);
  const [formFeedback, setFormFeedback] = useState<{
    accent: string;
    message: string;
  }>();

  const router = useRouter();
  if (user) router.push('/');

  const formik = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const res = await fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const authJson = await res.json();
        if (authJson.token) {
          localStorage.setItem('jwt', authJson.token);
          setFormFeedback({
            accent: 'success',
            message: 'Login successful. Redirecting you to home page.',
          });
        } else if (res.status === 401) {
          setFormFeedback({
            accent: 'danger',
            message:
              'Login failed. Please retry with correct email and password.',
          });
          console.error(res);
        } else {
          throw res;
        }
      } catch (err) {
        setFormFeedback({
          accent: 'danger',
          message: 'Login failed due to a network or server issue.',
        });
        console.error(err);
      }
      updateSession();
    },
    validate: values => {
      const errors: FormikErrors<typeof values> = {};
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
  });

  return (
    <>
      <h1>Login</h1>
      <p>Please enter your credentials to login.</p>
      <FormikProvider value={formik}>
        <Form>
          <InputText type="email" name="email" label="Email" />
          <InputText
            type="password"
            name="password"
            label="Password"
            minLength={8}
          />
          <Button type="submit" color="primary">
            Login {formik.isSubmitting && <Spinner size="sm" color="light" />}
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

Login.title = title;
