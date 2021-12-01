import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableVariant } from '@patternfly/react-table';
import '@patternfly/react-core/dist/styles/base.css';
import ServiceTable from './ServiceTable';

function App() {
  return (
    <ServiceTable />
  );
}

export default App;
