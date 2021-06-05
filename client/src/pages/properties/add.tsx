import {FormikProvider, useFormik, Form, Field} from 'formik';
import {Button, FormGroup, Input, Label} from 'reactstrap';

export default function AddProperty() {
  const formikBag = useFormik({
    initialValues: {
      name: '',
      area: '',
      type: '',
      offer: '',
      price: '',
      datePosted: '',
      dateAvailable: '',
      installments: false,
      description: '',
    },
    onSubmit: values =>
      fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          datePosted: new Date(values.datePosted),
          dateAvailable: new Date(values.dateAvailable),
        }),
      }),
  });
  return (
    <div>
      <FormikProvider value={formikBag}>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Field as={Input} type="text" name="name" id="title" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Field
              as={Input}
              type="textarea"
              name="description"
              id="description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="area">Area (square meters)</Label>
            <Field as={Input} type="number" name="area" id="area" />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <Field as={Input} type="select" name="type" id="type">
              <option value="land">Land</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </Field>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Field as={Input} type="radio" name="offer" value="sale" /> For
              sale
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Field as={Input} type="radio" name="offer" value="rent" /> For
              rent
            </Label>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="price">Price (USD)</Label>
            <Field as={Input} type="number" name="price" id="price" />
          </FormGroup>
          <FormGroup>
            <Label for="datePosted">Date posted</Label>
            <Field as={Input} type="date" name="datePosted" id="datePosted" />
          </FormGroup>
          <FormGroup>
            <Label for="dateAvailable">Date available</Label>
            <Field
              as={Input}
              type="date"
              name="dateAvailable"
              id="dateAvailable"
            />
          </FormGroup>
          <FormGroup check>
            <Field
              as={Input}
              type="checkbox"
              id="installments"
              name="installments"
            />
            <Label check>Installments</Label>
          </FormGroup>
          <br />
          <Button type="submit">Submit</Button>
        </Form>
      </FormikProvider>
      <pre>{JSON.stringify(formikBag.values, null, 2)}</pre>
    </div>
  );
}
