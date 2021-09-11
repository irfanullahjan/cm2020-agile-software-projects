import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import { SessionContext } from './_app';

const title = 'Sign up for an EasyHomes account';

export default function Signup() {
  const { user } = useContext(SessionContext);
  const router = useRouter();
  const [formFeedback, setFormFeedback] = useState<{
    accent: string;
    message: string;
  }>();

  const formik = useFormik<{
    username?: string;
    email?: string;
    password?: string;
    verifyPassword?: string;
  }>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
    },
    onSubmit: async values => {
      setFormFeedback(undefined);
      try {
        const formData = {
          ...values,
        };
        delete formData.verifyPassword;
        const res = await fetch('/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (res.status === 200) {
          setFormFeedback({
            accent: 'success',
            message: 'Signup successful. Redirecting you to login page.',
          });
          setTimeout(() => router.push('/login'), 1000);
        } else if (res.status === 409) {
          setFormFeedback({
            accent: 'danger',
            message:
              'Signup failed. Please retry with a different email or username.',
          });
          console.error(res);
        } else {
          throw res;
        }
      } catch (err) {
        setFormFeedback({
          accent: 'danger',
          message: 'Signup failed due to a network or server issue.',
        });
        console.error(err);
      }
    },
    validate: values => {
      let errors: FormikErrors<typeof values> = {};
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      if (values.verifyPassword !== values.password) {
        errors.verifyPassword = "Passwords don't match";
      }
      return errors;
    },
  });

  if (user) router.push('/');

  return (
    <>
      <h1>Signup</h1>
      <p>Please enter the following details to sign up.</p>
      <FormikProvider value={formik}>
        <Form>
          <InputText type="text" name="username" label="Username" />
          <InputText type="email" name="email" label="Email" />
          <InputText
            type="password"
            name="password"
            label="Password"
            minLength={8}
          />
          <InputText
            type="password"
            name="verifyPassword"
            label="Verify Password"
            minLength={8}
          />
          <Button type="submit" color="primary">
            Signup {formik.isSubmitting && <Spinner size="sm" color="light" />}
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

Signup.title = title;
