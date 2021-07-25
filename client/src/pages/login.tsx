import { InputText } from 'components/lib/InputText';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { Button } from 'reactstrap';
import { SessionContext } from './_app';

export default function Login() {
  const { user, updateSession } = useContext(SessionContext);

  const router = useRouter();
  if (user) router.push('/');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      const res = await fetch('/api/users/login', {
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
        alert('Login failed, please check your email and password.');
      }
      updateSession();
    },
    validate: values => {
      const errors: { [key: string]: string } = {};
      if (!values.email) {
        errors['email'] = 'Email is required';
      }
      if (!values.password) {
        errors['password'] = 'Password is required';
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
          <Button type="submit">Submit</Button>
        </Form>
      </FormikProvider>
    </>
  );
}
