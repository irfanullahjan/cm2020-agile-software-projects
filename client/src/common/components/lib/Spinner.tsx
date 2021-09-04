import { Spinner as RsSpinner } from 'reactstrap';

type Props = {
  position?: string;
};

export function Spinner(props: Props) {
  const { position = 'fixed' } = props;
  return (
    <div
      style={{
        position: position === 'fixed' ? 'fixed' : 'relative',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '25%',
      }}>
      <RsSpinner style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
}
