import { Field } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';

type Props = {
  name: string;
  items: {
    [key: string]: string;
  };
};

export function Select(props: Props) {
  const { name, items } = props;
  return (
    <FormGroup>
      <Label for="type">Type</Label>
      <Field as={Input} type="select" name={name}>
        {Object.keys(items).map((item, i) => (
          <option key={i} value={item}>
            {items[item]}
          </option>
        ))}
      </Field>
    </FormGroup>
  );
}
