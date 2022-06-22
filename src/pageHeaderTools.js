import React from 'react';
import {
  Button,
  ButtonVariant,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem
} from '@patternfly/react-core';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import { css } from '@patternfly/react-styles';
import { BellIcon, CogIcon } from '@patternfly/react-icons';

class AppPageHeaderTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0
    };
  }

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = event => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onKebabDropdownToggle = isKebabDropdownOpen => {
    this.setState({
      isKebabDropdownOpen
    });
  };

  onKebabDropdownSelect = event => {
    this.setState({
      isKebabDropdownOpen: !this.state.isKebabDropdownOpen
    });
  };

  render() {
    const { isDropdownOpen, isKebabDropdownOpen } = this.state;

    const kebabDropdownItems = [
      <DropdownItem componentID="notifications" key="notif">
        <BellIcon/> Notifications
      </DropdownItem>,
      <DropdownItem componentID="settings" key="settings">
        <CogIcon/> Settings
      </DropdownItem>
    ];
    const userDropdownItems = [
      <DropdownItem key="link">Link</DropdownItem>,
      <DropdownItem component="button" key="action">Action</DropdownItem>,
      <DropdownItem isDisabled componentID="disabled" key="disabled_link">Disabled Link</DropdownItem>,
      <DropdownItem isDisabled component="button" componentID="disabledButton" key="disabled_action">
        Disabled Action
      </DropdownItem>,
      <DropdownSeparator key="separator"/>,
      <DropdownItem componentID="sep_link" key="sep_link">Separated Link</DropdownItem>,
      <DropdownItem component="button" componentID="sep_button" key="sep_act">Separated Action</DropdownItem>
    ];
    return (
      <PageHeaderTools>
        <PageHeaderToolsGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
          <PageHeaderToolsItem id="notifications">
            <Button id="simple-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
              <BellIcon/>
            </Button>
          </PageHeaderToolsItem>
          <PageHeaderToolsItem id="settings">
            <Button id="simple-example-uid-02" aria-label="Settings actions" variant={ButtonVariant.plain}>
              <CogIcon/>
            </Button>
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        <PageHeaderToolsGroup>
          <PageHeaderToolsItem className={css(accessibleStyles.hiddenOnLg, spacingStyles.mr_0)} id="login">
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onKebabDropdownSelect}
              toggle={<KebabToggle onToggle={this.onKebabDropdownToggle}/>}
              isOpen={isKebabDropdownOpen}
              dropdownItems={kebabDropdownItems}
            />
          </PageHeaderToolsItem>
          <PageHeaderToolsItem className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnMd)} id="user">
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>User</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
      </PageHeaderTools>
    )
  }
}

export default AppPageHeaderTools;
