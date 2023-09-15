import React, { useEffect, useState } from "react";

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text,
    TextListVariants,
    TextListItemVariants,
    TextListItem,
    TextList,
    Tabs, 
    Tab,
    TabContent,
    TabTitleText,
} from "@patternfly/react-core";

import { useParams } from "react-router-dom";

import { API_URL } from '../AppConstants';

import { NotificationsContext } from '../components/notifications';

import {default as Link} from '../components/LinkWrapper';

const NONE_SPECIFIED = "None specified";

export default function Service() {
    const notifications = React.useContext(NotificationsContext);

    const name = useParams().name;

    const [service, setService] = useState({
        id: 0, 
        name: "",
        display_name: "",
        tenant: "",
        projects: [],
    });

    const [activeTab, setActiveTab] = useState(0);

    const detailsTabRef = React.createRef();

    useEffect(() => {
        fetchService(`${API_URL}/api/v1/services/${name}`);
    }, []);

    async function fetchService(path) {
        fetch(path).then(res => {
            if (!res.ok) {
                throw new Error(`Service ${name} not found`);
            }
            return res.json();
        }).then(data => {
            if (data == undefined || data == null) {
                // service not found
                notifications.sendError(`Service ${name} not found`);
                return null;
            }
            
            if (data.length > 0) { // Duplicate names, it's possible...
                setService(data[0]);
            }

            setService(data);
        }).catch(error => {
            notifications.sendError(error.message);
        });
    }

    function handleTabClick(_event, tabIndex) {
        setActiveTab(tabIndex);
    }

    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text className="fullWidth" component="h1">
                        {service.display_name == "" ? name : service.display_name}
                    </Text>
                </TextContent>
            </PageSection>

            <Tabs
                mountOnEnter
                activeKey={activeTab}
                onSelect={handleTabClick}
                isBox={false}
                aria-label="Tabs of service information"
                role="region"
                style={{overflow: "visible"}}
            >
                <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>} tabContentId="detailsTabContent" tabContentRef={detailsTabRef} />
            </Tabs>

            <>
                <TabContent
                    eventKey={0}
                    id="detailsTabContent"
                    ref={detailsTabRef}
                    aria-label={`Details for ${service.display_name}`}
                >
                    <PageSection variant={PageSectionVariants.light}>
                        <TextContent>
                            <TextList component={TextListVariants.dl}>
                                <TextListItem component={TextListItemVariants.dt}>Tenant</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>{service.tenant ? service.tenant : NONE_SPECIFIED}</TextListItem>
                                <TextListItem component={TextListItemVariants.dt}>Projects</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>{service.projects && service.projects.length == 0 ? NONE_SPECIFIED : null}</TextListItem>
                            </TextList>
                            {/* list the projects under service.projects */}
                            <TextList component={TextListVariants.dl}>
                                {/* eslint-disable-next-line no-unused-vars */}
                                {service.projects && service.projects.map((project, _index) => {
                                    return <TextListItem key={project.id}component={TextListItemVariants.dt}><Link to={`/projects/${project.name}`}>{project.name}</Link></TextListItem>;
                                })}
                            </TextList>
                        </TextContent>
                    </PageSection>
                </TabContent>
            </>     
        </>
    );
}

