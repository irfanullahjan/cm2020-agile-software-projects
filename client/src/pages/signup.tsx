import { InputText } from 'components/lib/InputText';
import { Form, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { Button } from 'reactstrap';
import { SessionContext } from './_app';

export default function Login() {
  const { user, updateSession } = useContext(SessionContext);
  const router = useRouter();

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
      const signupJson = await res.json();
      if (signupJson.email) router.push('/login');
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
  return (
    <>
      <h1>Signup</h1>
      <p>Please enter details to sign up.</p>
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
          <Button type="submit">Submit</Button>
        </Form>
      </FormikProvider>
    </>
  );
}
