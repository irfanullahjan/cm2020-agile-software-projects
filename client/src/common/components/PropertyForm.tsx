import { FormikProvider, useFormik, Form, Field } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { InputText } from 'components/lib/InputText';
import { RadioGroup } from 'components/lib/RadioGroup';
import { Select } from 'components/lib/Select';
import { useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { SessionContext } from '../../pages/_app';
import { Spinner } from './lib/Spinner';
import { Spinner as RsSpinner } from 'reactstrap';
import useSWR from 'swr';
import { fetcher } from 'utils/fetcher';
import Error from 'next/error';

type Props = {
  propertyId?: number;
};

export function PropertyForm(props: Props) {
  const router = useRouter();
  const { user } = useContext(SessionContext);
  const [formFeedback, setFormFeedback] = useState<{
    accent: string;
    message: string;
  }>();
  const { propertyId } = props;

  const emptyForm = {
    title: '',
    description: '',
    area: '',
    type: 'land',
    offer: 'sale',
    price: '',
    dateAvailable: '',
    installments: false,
  };

  const {
    data: propertyData,
    error,
    isValidating,
  } = useSWR(propertyId ? `/api/properties/${propertyId}` : null, fetcher);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    area: Yup.number()
      .required('Required')
      .positive('Area cannot be negative.')
      .integer('Please round to nearest integer.'),
    price: Yup.number()
      .required('Required')
      .positive('Price cannot be negative.')
      .integer('Please round to nearest integer.'),
    dateAvailable: Yup.date().required('Required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...emptyForm,
      ...propertyData,
      dateAvailable:
        propertyData?.dateAvailable.length > 0
          ? new Date(propertyData.dateAvailable).toISOString().slice(0, 10)
          : '',
    },
    onSubmit: values => {
      fetch(`/api/properties${propertyId ? `/${propertyId}` : ''}`, {
        method: propertyId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          installments: values.offer === 'sale' ? values.installments : false,
          dateAvailable: new Date(values.dateAvailable),
          userId: user.id,
        }),
      })
        .then(res => {
          formik.setSubmitting(false);
          if (res.status === 200 || res.status === 204) {
            router.push('/');
            setFormFeedback({
              accent: 'success',
              message:
                'Property saved successfully. Redirecting you to home page.',
            });
          } else {
            throw res;
          }
        })
        .catch(err => {
          setFormFeedback({
            accent: 'danger',
            message: 'Signup failed due to a network or server issue.',
          });
          console.error(err);
        });
    },
    validationSchema,
  });

  if (propertyData && user.id !== propertyData?.userId)
    return (
      <Error
        statusCode={401}
        title="You are not authorized to edit this property."
      />
    );

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  return (
    <div>
      {isValidating && <Spinner />}
      <FormikProvider value={formik}>
        <Form>
          <InputText label="Title" name="title" />
          <InputText label="Description" name="description" type="textarea" />
          <InputText label="Area (square meters)" name="area" type="number" />
          <Select
            label="Type"
            name="type"
            items={{
              land: 'Land',
              house: 'House',
              apartment: 'Apartment',
              commercial: 'Commercial',
            }}
          />
          <RadioGroup
            name="offer"
            items={{ rent: 'For rent', sale: 'For sale' }}
          />
          <br />
          <InputText
            label={
              formik.values.offer === 'sale'
                ? 'Price (USD)'
                : 'Monthly rent (USD)'
            }
            name="price"
            type="number"
          />
          {formik.values.offer === 'sale' ? (
            <FormGroup check>
              <Field
                as={Input}
                type="checkbox"
                id="installments"
                name="installments"
              />
              <Label check>Available for sale on installements.</Label>
            </FormGroup>
          ) : null}
          <br />
          <InputText label="Date available" name="dateAvailable" type="date" />
          <br />
          <Button type="submit" color="primary">
            Submit{' '}
            {formik.isSubmitting && <RsSpinner size="sm" color="light" />}
          </Button>
        </Form>
        {formFeedback && (
          <p className={`text-${formFeedback.accent} mt-3`}>
            {formFeedback.message}
          </p>
        )}
      </FormikProvider>
    </div>
  );
}
