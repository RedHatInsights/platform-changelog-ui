import React, { useState } from "react";
import {
    Nav,
    NavItem,
    NavList,
    Page,
    PageSidebar,
} from "@patternfly/react-core";

import { Routes, Route, useLocation, Link } from "react-router-dom";

import { APP_ROOT } from './AppConstants';

import { MainHeader }  from "./components";
import { FilterToolbar } from './components/filters';

import {
    Home,
    Services,
    Commits,
    Deploys,
    Service,
    Error,
} from "./pages";

function AppPage() {
    const location = useLocation();

    const active = location.pathname;

    const [isNavOpen, toggleNav] = useState(false);

    const PageNav = (
        <Nav aria-label="Nav">
            <NavList>
                <NavItem itemId={0} isActive={active === "/"}>
                    <Link to={`${APP_ROOT}/`}>Home</Link>
                </NavItem>
                <NavItem itemId={1} isActive={active === "/services"}>
                    <Link to={`${APP_ROOT}/services`}>Services</Link>
                </NavItem>
                <NavItem itemId={2} isActive={active === "/commits"}>
                    <Link to={`${APP_ROOT}/commits`}>Commits</Link>
                </NavItem>
                <NavItem itemId={3} isActive={active === "/deploys"}>
                    <Link to={`${APP_ROOT}/deploys`}>Deploys</Link>
                </NavItem>
            </NavList>
        </Nav>
    );

    const Sidebar = <PageSidebar nav={PageNav} />;
    const pageId = "main-content";

    return (
        <Page
            header={<MainHeader isNavOpen={isNavOpen} toggleNav={toggleNav} pathname={active} />}
            sidebar={Sidebar}
            isManagedSidebar
            mainContainerId={pageId}
            className="myPageClass"
        >
            <FilterToolbar />
            <Routes>
                <Route path="*" element={
                    <Error
                        error="404: We can't find this page"
                        description="Another page might have what you need, so try one of the links below."
                    />
                } />
                <Route path={`${APP_ROOT}/`} element={<Home />} />
                <Route path={`${APP_ROOT}/services`} element={<Services />} />
                <Route path={`${APP_ROOT}/commits`} element={<Commits />} />
                <Route path={`${APP_ROOT}/deploys`} element={<Deploys />} />
                <Route path={`${APP_ROOT}/services/:name`} element={<Service />} />
            </Routes>
        </Page>
    );
}

export default AppPage;

