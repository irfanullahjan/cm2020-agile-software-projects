import { FormikProvider, useFormik, Form, Field } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { InputText } from 'components/lib/InputText';
import { RadioGroup } from 'components/lib/RadioGroup';
import { Select } from 'components/lib/Select';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { SessionContext } from '../../pages/_app';

type Props = {
  propertyId?: number;
};

export function PropertyForm(props: Props) {
  const router = useRouter();
  const { user } = useContext(SessionContext);

  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    area: '',
    type: 'land',
    offer: 'sale',
    price: '',
    dateAvailable: '',
    installments: false,
  });

  const { propertyId } = props;

  useEffect(() => {
    propertyId && propertyId > 0
      ? fetch(`/api/properties/${propertyId}`)
          .then(res => res.json())
          .then(jsonData => setPropertyData(jsonData))
      : null;
  }, [propertyId]);

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
  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...propertyData,
      dateAvailable:
        propertyData.dateAvailable.length > 0
          ? new Date(propertyData.dateAvailable).toISOString().slice(0, 10)
          : '',
    },
    onSubmit: values =>
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
      }).then(() => router.push('/properties')),
    validationSchema,
  });
  return (
    <div>
      <FormikProvider value={formikBag}>
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
              formikBag.values.offer === 'sale'
                ? 'Price (USD)'
                : 'Monthly rent (USD)'
            }
            name="price"
            type="number"
          />
          {formikBag.values.offer === 'sale' ? (
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
          <Button type="submit">Submit</Button>
        </Form>
      </FormikProvider>
    </div>
  );
}
