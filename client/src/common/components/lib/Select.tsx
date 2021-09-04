import { useField } from 'formik';
import { FormGroup, Input, InputProps, Label } from 'reactstrap';

interface Props extends InputProps {
  label: string;
  name: string;
  items: {
    [key: string]: string;
  };
  nullable?: boolean;
}

export function Select(props: Props) {
  const { name, label, items, nullable, ...otherProps } = props;
  const [{ value, ...field }] = useField(name);
  return (
    <FormGroup>
      <Label for="type">{label}</Label>
      <Input type="select" value={value ?? ''} {...field} {...otherProps}>
        {nullable && <option value="">All</option>}
        {Object.keys(items).map((item, i) => (
          <option key={i} value={item}>
            {items[item]}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}
