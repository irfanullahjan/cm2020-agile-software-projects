import Link from 'next/link';
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

type Props = {
  properties: { [key: string]: any }[];
  editable?: boolean;
};

export function PropertiesGrid(props: Props) {
  const { properties, editable } = props;
  return (
    <Row className="my-4">
      {properties.map((property, i) => (
        <Col key={i} className="col-12 col-md-6 col-lg-4 mb-4">
          <Card>
            <CardImg
              top
              width="100%"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzE4IiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMzE0IiBoZWlnaHQ9IjE3NiIgc3R5bGU9ImZpbGw6I2RlZGVkZTtzdHJva2U6I2YwZWRlZDtzdHJva2Utd2lkdGg6MiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSwgc2Fucy1zZXJpZiIgZmlsbD0iIzRhNGE0YSI+MzE4JiMyMTU7MTgwPC90ZXh0Pjwvc3ZnPg=="
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">{property.title}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <span className="text-capitalize">{property.type}</span>
              </CardSubtitle>
              <CardText>
                {property.offer === 'sale'
                  ? `Sale price: $${property.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                  : `Annual rent: $${property.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                <br />
                Area: {property.area} m<sup>2</sup>
              </CardText>
              <Link href={`/${property.id}`} passHref>
                <a className="btn btn-primary mr-2">View</a>
              </Link>
              {editable && (
                <Link href={`/${property.id}/edit`} passHref>
                  <a className="btn btn-secondary">Edit</a>
                </Link>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
