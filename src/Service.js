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
import Icon from "./Icon";

export default function Service({service}) {
    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text className="fullWidth" component="h1">
                        {service[2]}
                        <div className="right">
                            {service[3] && <Icon github link={service[3]} />}
                            {service[4] && <Icon gitlab link={service[4]} />}
                        </div>
                    </Text>
                    <Text component="p">
                        Most recent commits and deployments for this service.
                    </Text>
                </TextContent>
            </PageSection>
            <PageSection>
                <CommitTable dataPath={ `/api/v1/services/${service[1]}` }/>
            </PageSection>
            <PageSection>
                <DeployTable dataPath={ `/api/v1/services/${service[1]}` }/>
            </PageSection>
        </>
    );
}

