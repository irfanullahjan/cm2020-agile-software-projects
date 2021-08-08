import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { PropertiesGrid } from 'components/lib/PropertiesGrid';

export default function Properties() {
  type Property = { [key: string]: string };
  const [propertiesData, setPropertiesData] =
    useState<Property[] | undefined>(undefined);
  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(json => setPropertiesData(json));
  }, []);
  if (propertiesData === undefined) return <Spinner />;

  return (
    <>
      <h1>Properties</h1>
      {propertiesData.length > 0 ? (
        <PropertiesGrid properties={propertiesData} />
      ) : (
        <p>No properties.</p>
      )}
    </>
  );
}
