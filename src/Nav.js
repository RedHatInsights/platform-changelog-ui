import"@patternfly/react-core/dist/styles/base.css";
import "./fonts.css"

import React from 'react';
import { Nav, NavExpandable, NavItem, NavItemSeparator, NavList, NavGroup } from '@patternfly/react-core';

class NavExpandableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGroup: 'grp-1',
      activeItem: 'grp-1_itm-1'
    };
    this.onSelect = result => {
      this.setState({
        activeGroup: result.groupId,
        activeItem: result.itemId
      });
    };
    this.onToggle = result => {
      // eslint-disable-next-line no-console
      console.log(`Group ${result.groupId} expanded? ${result.isExpanded}`);
    };
    this.handleItemOnclick = (event, itemId, groupId) => {
      // eslint-disable-next-line no-console
      console.log(`my own click handler on ${itemId}`);
    };
  }

  render() {
    const { activeGroup, activeItem } = this.state;
    return (
      <Nav onSelect={this.onSelect} onToggle={this.onToggle}>
        <NavList>
          <NavExpandable title="Services" groupId="grp-1" isActive={activeGroup === 'grp-1'}>
            <NavItem
              preventDefault
              to="#expandable-1"
              groupId="grp-1"
              itemId="grp-1_itm-1"
              isActive={activeItem === 'grp-1_itm-1'}
            >
              Subnav Link 1
            </NavItem>
            <NavItemSeparator />
            <NavItem preventDefault groupId="grp-1" itemId="grp-1_itm-2" isActive={activeItem === 'grp-1_itm-2'}>
              Subnav Link 2
            </NavItem>
            <NavItem to="#expandable-3" groupId="grp-1" itemId="grp-1_itm-3" isActive={activeItem === 'grp-1_itm-3'}>
              Subnav Link 3
            </NavItem>
          </NavExpandable>
          <NavExpandable title="Commits" groupId="grp-2" isActive={activeGroup === 'grp-2'}>
            <NavItem
              preventDefault
              onClick={this.handleItemOnclick}
              groupId="grp-2"
              itemId="own-item-handler"
              isActive={activeItem === 'own-item-handler'}
            >
              Custom onClick
            </NavItem>
            <NavItem
              preventDefault
              to="#expandable-4"
              groupId="grp-2"
              itemId="grp-2_itm-1"
              isActive={activeItem === 'grp-2_itm-1'}
            >
              Subnav Link 1
            </NavItem>
            <NavItem
              preventDefault
              to="#expandable-5"
              groupId="grp-2"
              itemId="grp-2_itm-2"
              isActive={activeItem === 'grp-2_itm-2'}
            >
              Subnav Link 2
            </NavItem>
            <NavItem
              preventDefault
              to="#expandable-6"
              groupId="grp-2"
              itemId="grp-2_itm-3"
              isActive={activeItem === 'grp-2_itm-3'}
            >
              Subnav Link 3
            </NavItem>
          </NavExpandable>
        </NavList>
      </Nav>
    );
  }
}

export default NavExpandableList
