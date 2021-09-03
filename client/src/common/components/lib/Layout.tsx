import { Col, Container, Row } from 'reactstrap';
import { NavbarTop } from './NavbarTop';

type Props = {
  children: JSX.Element;
};

export function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <div className="bg-dark">
        <Container>
          <Row>
            <Col>
              <NavbarTop />
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ flex: '1 0 auto' }}>
        <Container>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </div>
      <div className="bg-dark text-secondary py-2" style={{ flexShrink: 0 }}>
        <Container>
          <Row>
            <Col>
              <span>&copy; EasyHomes 2021</span>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
