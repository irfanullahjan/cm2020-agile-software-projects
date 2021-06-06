import { FormikProvider, useFormik, Form, Field } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import { InputText } from '../../common/components/InputText';
import { RadioGroup } from '../../common/components/RadioGroup';
import { Select } from '../../common/components/Select';

export default function AddProperty() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    area: Yup.number().required('Required'),
    price: Yup.number().required('Required'),
    dateAvailable: Yup.date().required('Required'),
  });
  const formikBag = useFormik({
    initialValues: {
      title: '',
      description: '',
      area: '',
      type: '',
      offer: 'rent',
      price: '',
      dateAvailable: '',
      installments: false,
    },
    onSubmit: values =>
      fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          installments: values.offer === 'sale' ? values.installments : false,
          datePosted: new Date(),
          dateAvailable: new Date(values.dateAvailable),
        }),
      }),
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
      <pre>{JSON.stringify(formikBag.values, null, 2)}</pre>
    </div>
  );
}
