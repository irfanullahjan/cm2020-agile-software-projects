import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const PropertyCard = () => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" />
        <CardBody>
          <CardTitle tag="h5">Price</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
          <CardText>Description of the property</CardText>
          <Button>See more</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PropertyCard;