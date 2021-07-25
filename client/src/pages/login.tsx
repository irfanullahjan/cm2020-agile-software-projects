import { InputText } from 'components/lib/InputText';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { Button } from 'reactstrap';
import { SessionContext } from './_app';

export default function Login() {
  const router = useRouter();
  const { user, updateSession } = useContext(SessionContext);

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
        console.error('login failed, please see /src/pages/login.tsx');
      }
      updateSession();
    },
  });

  return (
    <>
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
