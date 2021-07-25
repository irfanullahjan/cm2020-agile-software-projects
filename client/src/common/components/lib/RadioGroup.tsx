import { Field } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';

type Props = {
  name: string;
  items: {
    [key: string]: string;
  };
};

export function RadioGroup(props: Props) {
  const { name, items } = props;
  return (
    <>
      {Object.keys(items).map((item, i) => (
        <FormGroup check key={i}>
          <Label check>
            <Field as={Input} type="radio" name={name} value={item} />{' '}
            {items[item]}
          </Label>
        </FormGroup>
      ))}
    </>
  );
}
