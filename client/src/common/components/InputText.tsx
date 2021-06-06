import { ErrorMessage, Field, useFormikContext } from 'formik';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

type Props = {
  label: string;
  name: string;
  type?: string;
};

export function InputText(props: Props) {
  const { label, name, type } = props;
  const { touched, errors } = useFormikContext();

  // @ts-ignore
  const invalid = touched && touched[name] && errors && errors[name];
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Field
        as={Input}
        type={type || 'text'}
        name={name}
        invalid={invalid ? true : false}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}
