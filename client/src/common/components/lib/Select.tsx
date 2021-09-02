import { Field } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';

type Props = {
  name: string;
  label: string;
  items: {
    [key: string]: string;
  };
  nullable?: boolean;
};

export function Select(props: Props) {
  const { name, label, items, nullable } = props;
  return (
    <FormGroup>
      <Label for="type">{label}</Label>
      <Field as={Input} type="select" name={name}>
        {nullable && <option value="">All</option>}
        {Object.keys(items).map((item, i) => (
          <option key={i} value={item}>
            {items[item]}
          </option>
        ))}
      </Field>
    </FormGroup>
  );
}
