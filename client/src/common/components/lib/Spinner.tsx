import { Spinner as RsSpinner } from 'reactstrap';

export function Spinner() {
  return (
    <RsSpinner
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '3rem',
        height: '3rem',
      }}
    />
  );
}
