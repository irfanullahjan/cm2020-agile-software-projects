import { useEffect, useState } from 'react';
import { Spinner } from 'components/lib/Spinner';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';
import { Form, FormikProvider, useFormik } from 'formik';
import { Col, Row } from 'reactstrap';
import { InputText } from 'components/lib/InputText';
import { Select } from 'components/lib/Select';
import { fetcher } from 'utils/fetcher';
import useSWR from 'swr';
import Error from 'next/error';

export default function Properties() {
  const defaultFilter = { include: ['user'], order: 'createStamp DESC' };
  const [searchFilter, setSearchFilter] = useState<object>(defaultFilter);

  const {
    data: propertiesData,
    error,
    isValidating,
  } = useSWR(`/api/properties?filter=${JSON.stringify(searchFilter)}`, fetcher);

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
        setSearchFilter({ where: whereFilter, ...defaultFilter });
      } else {
        setSearchFilter({ ...defaultFilter });
      }
    },
  });
  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);

  if (error)
    return <Error statusCode={error.status} title={error.statusText} />;

  return (
    <>
      <h1>Properties</h1>
      {isValidating && <Spinner />}
      <FormikProvider value={formik}>
        <Form>
          <Col>
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
          </Col>
        </Form>
      </FormikProvider>
      {propertiesData?.length > 0 ? (
        <PropertiesGrid properties={propertiesData} />
      ) : (
        <p className="py-3">No properties.</p>
      )}
    </>
  );
}
