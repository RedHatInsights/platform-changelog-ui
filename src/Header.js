import React from 'react';
import {
  Brand,
  PageHeader,
} from '@patternfly/react-core';
import AppPageHeaderTools from './pageHeaderTools';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageHeader
        logo={<Brand src="/images/Masthead.png" alt="Gumbaroo" />}
        headerTools={<AppPageHeaderTools />}
        showNavToggle
      />
    );
  }
}

export default AppHeader;

