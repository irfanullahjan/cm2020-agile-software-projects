import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { SessionContext } from './_app';

const title = 'Login to EasyHomes';

export default function Login() {
  const { user, updateSession } = useContext(SessionContext);

  const [submitError, setSubmitError] = useState(false);

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
        } else {
          setSubmitError(true);
        }
      } catch (err) {
        setSubmitError(true);
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
          <Button type="submit">
            Login {formik.isSubmitting && <Spinner size="sm" color="black" />}
          </Button>
          {submitError && (
            <p className="text-danger mt-3">
              Error logging in. Please check your email and password.
            </p>
          )}
        </Form>
      </FormikProvider>
    </>
  );
}

Login.title = title;
