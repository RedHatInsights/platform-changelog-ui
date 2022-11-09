import React, { useState, useContext } from "react";
import {
    Nav,
    NavItem,
    NavList,
    Page,
    PageSidebar,
} from "@patternfly/react-core";

import { Routes, Route, useLocation, Link } from "react-router-dom";

import * as ConstantTypes from './AppConstants';

import { MainHeader }  from "components";
import {
    FilterManager,
    FilterToolbar,
    FilterContext,
} from 'components/filters';

import {
    Home,
    Services,
    Commits,
    Deploys,
    Service,
    Error,
} from "pages";

function AppPage() {
    const location = useLocation();

    const active = location.pathname;

    const [isNavOpen, toggleNav] = useState(false);

    const PageNav = (
        <Nav aria-label="Nav">
            <NavList>
                <NavItem itemId={0} isActive={active === "/"}>
                    <Link to="/">Home</Link>
                </NavItem>
                <NavItem itemId={1} isActive={active === "/services"}>
                    <Link to="/services">Services</Link>
                </NavItem>
                <NavItem itemId={2} isActive={active === "/commits"}>
                    <Link to="/commits">Commits</Link>
                </NavItem>
                <NavItem itemId={3} isActive={active === "/deploys"}>
                    <Link to="/deploys">Deploys</Link>
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

