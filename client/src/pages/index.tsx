import { useEffect, useState } from 'react';
import { Spinner } from 'components/lib/Spinner';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';
import { Form, FormikProvider, useFormik } from 'formik';
import { Col, Row } from 'reactstrap';
import { InputText } from 'components/lib/InputText';
import { Select } from 'components/lib/Select';

export default function Properties() {
  type Property = { [key: string]: string };
  const [loading, setLoading] = useState(false);
  const defaultFilter = { include: ['user'], order: 'createStamp DESC' };
  const [searchFilter, setSearchFilter] = useState<string>(
    JSON.stringify(defaultFilter),
  );
  const [propertiesData, setPropertiesData] = useState<Property[]>([]);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/properties${searchFilter ? `?filter=${searchFilter}` : ''}`)
      .then(res => res.json())
      .then(json => {
        setPropertiesData(json);
        setLoading(false);
      });
  }, [searchFilter]);
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any) => {
      const whereFilter: any = {};
      if (values.offer) {
        whereFilter['offer'] = values.offer;
      }
      if (values.type) {
        whereFilter['type'] = values.type;
      }
      if (values.minAmount && values.maxAmount) {
        whereFilter['price'] = {
          between: [+values.minAmount, +values.maxAmount],
        };
      } else if (values.minAmount) {
        whereFilter['price'] = {
          gte: +values.minAmount,
        };
      } else if (values.maxAmount) {
        whereFilter['price'] = {
          lte: +values.maxAmount,
        };
      }
      if (values.minArea && values.maxArea) {
        whereFilter['area'] = {
          between: [+values.minArea, +values.maxArea],
        };
      } else if (values.minArea) {
        whereFilter['area'] = {
          gte: +values.minArea,
        };
      } else if (values.maxArea) {
        whereFilter['area'] = {
          lte: +values.maxArea,
        };
      }
      if (Object.keys(whereFilter).length > 0) {
        setSearchFilter(
          JSON.stringify({ where: whereFilter, ...defaultFilter }),
        );
      } else {
        setSearchFilter(JSON.stringify({ ...defaultFilter }));
      }
    },
  });
  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);

  return (
    <>
      <h1>Properties</h1>
      <FormikProvider value={formik}>
        <Form>
          <Row className="p-2 bg-dark text-light rounded">
            <Col md={4} lg={2}>
              <Select
                label="Type"
                name="type"
                items={{
                  house: 'House',
                  apartment: 'Apartment',
                  land: 'Land',
                  commercial: 'Commercial',
                }}
                nullable={true}
              />
            </Col>
            <Col md={4} lg={2}>
              <Select
                label="Offer"
                name="offer"
                items={{ sale: 'For sale', rent: 'For rent' }}
                nullable={true}
              />
            </Col>
            <Col md={4} lg={2}>
              <InputText label="Min Amount" name="minAmount" type="number" />
            </Col>
            <Col md={4} lg={2}>
              <InputText label="Max Amount" name="maxAmount" type="number" />
            </Col>
            <Col md={4} lg={2}>
              <InputText label="Min Area" name="minArea" type="number" />
            </Col>
            <Col md={4} lg={2}>
              <InputText label="Max Area" name="maxArea" type="number" />
            </Col>
          </Row>
        </Form>
      </FormikProvider>
      {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
      {propertiesData.length > 0 ? (
        <PropertiesGrid properties={propertiesData} />
      ) : (
        <p>No properties.</p>
      )}
      {loading && <Spinner />}
    </>
  );
}
