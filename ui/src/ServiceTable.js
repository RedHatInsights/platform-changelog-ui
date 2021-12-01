import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableVariant } from '@patternfly/react-table';
import '@patternfly/react-core/dist/styles/base.css';

function ServiceTable() {
  const [serviceColumns, setServiceColumns] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);

  useEffect(() => {
    fetch('/services/').then(res => res.json()).then(data => {
      setServiceColumns(Object.keys(data[0]));
      setServiceRows(data.map(d => Object.values(d)));
    });
  }, []);

  return (
    <Table caption="Services" rows={serviceRows} cells={serviceColumns} variant={TableVariant.compact}>
      <TableHeader />
      <TableBody />
    </Table>
  );
}

export default ServiceTable;
