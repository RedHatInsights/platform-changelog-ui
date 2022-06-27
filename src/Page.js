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

import {Routes, Route, useLocation} from "react-router-dom";

import Home from "Home";
import Service from "./Service";
import Services from "Services";
import Commits from "Commits";
import Deploys from "Deploys";


function AppPage() {

    const active = useLocation().pathname;

    const PageNav = (
        <Nav aria-label="Nav">
          <NavList>
            <NavItem itemId={0} isActive={active === "/"} to="/">
                Home
            </NavItem>
            <NavItem itemId={1} isActive={active === "/services"} to="/services">
                Services
            </NavItem>
            <NavItem itemId={2} isActive={active === "/commits"} to="/commits">
                Commits 
            </NavItem>
            <NavItem itemId={3} isActive={active === "/deploys"} to="/deploys">
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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/commits" element={<Commits />} />
                <Route path="/deploys" element={<Deploys />} />
                <Route path="/services/:name" element={<Service />} />
            </Routes>
        </Page>
    );
}

export default AppPage;

