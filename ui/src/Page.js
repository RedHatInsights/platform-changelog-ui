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
import Service from "./Service";

class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
      onNavChange: this.onNavChange.bind(this),
      activeService: null
    };
  }

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId,
      activeService: null
    });
  };

  /** Added for changes triggered by non NavItem element */
  onNavChange = (itemId, service) => {
    this.setState({
      activeItem: itemId,
      activeService: service
    });
  }

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
              <NavItem itemId={3} isActive={activeItem === 3}>
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

    /** 
     * Once the user selects a service, the page will display the commits and deploys for that service
     */
    return (
      <Page
        header={<AppHeader />}
        sidebar={Sidebar}
        isManagedSidebar
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
        className="myPageClass"
      >
        {this.state.activeItem === -1 
            ? <Service service={this.state.activeService} /> 
            : <>
                <PageSection variant={PageSectionVariants.light}>
                {this.state.activeItem === -1 && <TextContent>
                    <Text component="h1">{this.state.activeService} Details</Text>
                    <Text component="p">
                        Most recent commits and deployments for this service.
                    </Text>
                </TextContent>}
                {this.state.activeItem === 0 ? <TextContent>
                    <Text component="h1">Gumbaroo</Text>
                    <Text component="p">
                    Global Changelog System for Console Dot Platform
                    </Text> 
                </TextContent> : null }
                {this.state.activeItem === 1 ? <TextContent>
                    <Text component="h1">Services</Text>
                    <Text component="p">
                        Managed services monitored by Gumbaroo
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
                {this.state.activeItem === 0 || this.state.activeItem === 1 ? <ServiceTable onNavChange={this.onNavChange}/> : null }
                {this.state.activeItem === 0 || this.state.activeItem === 2 ? <CommitTable/> : null }
                {this.state.activeItem === 0 || this.state.activeItem === 3 ? <DeployTable/> : null }
                {this.state.activeItem === -1 
                    && <>
                        <CommitTable dataPath={ `/api/v1/services/${this.state.activeService}` }/>
                        <DeployTable dataPath={ `/api/v1/services/${this.state.activeService}` }/>
                    </>
                }
                </PageSection>
            </>}
      </Page>
    );
  }
}

export default AppPage;

