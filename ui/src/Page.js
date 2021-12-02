import React from "react";
import {
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  SkipToContent,
  TextContent,
  Text
} from "@patternfly/react-core";
import AppHeader from "./Header";
import NavExpandableList from "./Nav";
import ServiceTable from "./ServiceTable";
import CommitTable from "./CommitTable";
import DeployTable from "./DeployTable";

class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };
  }

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };

  render() {
      const {activeItem} = this.state;
      const {children} = this.props;

      const PageNav = (
          <Nav onSelect={this.onNavSelect} aria-label="Nav">
            <NavList>
              <NavItem itemId={0} isActive={activeItem === 0}>
                Home 
              </NavItem>
              <NavItem itemId={1} isActive={activeItem === 1}>
                Services
              </NavItem>
              <NavItem itemId={2} isActive={activeItem === 2}>
                Commits 
              </NavItem>
              <NavItem itemId={3} isActive={activeItem === 2}>
                Deploys 
              </NavItem>
          </NavList>
          </Nav>
      );


    const Sidebar = <PageSidebar nav={PageNav} />;
    const pageId = "main-content-page-layout-simple-nav";
    const PageSkipToContent = (
      <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
    );

    return (
      <Page
        header={<AppHeader />}
        sidebar={Sidebar}
        isManagedSidebar
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
        className="myPageClass"
      >
        <PageSection variant={PageSectionVariants.light}>
        {this.state.activeItem === 0 ? <TextContent>
            <Text component="h1">Gumbaroo</Text>
            <Text component="p">
              Global Changelog System for Console Dot Platform
            </Text> 
          </TextContent> : null }
        {this.state.activeItem === 1 ? <TextContent>
            <Text component="h1">Services</Text>
            <Text component="p">
                Manged services monitored by Gumbaroo
            </Text> 
          </TextContent> : null }
        {this.state.activeItem === 2 ? <TextContent>
            <Text component="h1">Commits</Text>
            <Text component="p">
                Complete commit logs for managed services
            </Text> 
          </TextContent> : null }
        {this.state.activeItem === 3 ? <TextContent>
            <Text component="h1">Deploys</Text>
            <Text component="p">
                Complete deployment logs for managed services
            </Text> 
          </TextContent> : null }
        </PageSection>
        <PageSection>
          {this.state.activeItem === 0 || this.state.activeItem === 1 ? <ServiceTable/> : null }
          {this.state.activeItem === 0 || this.state.activeItem === 2 ? <CommitTable/> : null }
          {this.state.activeItem === 0 || this.state.activeItem === 3 ? <DeployTable/> : null }
        </PageSection>
      </Page>
    );
  }
}

export default AppPage;

