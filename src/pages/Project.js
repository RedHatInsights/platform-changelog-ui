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
import { GithubIcon } from '@patternfly/react-icons';

import { useParams } from "react-router-dom";

import { API_URL } from '../AppConstants';

import { NotificationsContext } from '../components/notifications';
import {
    CommitTable,
    DeployTable,
} from '../components/tables';

import {
    Timelines
} from '../components';

const NONE_SPECIFIED = "None specified";

export default function Project() {
    const notifications = React.useContext(NotificationsContext);

    const id = useParams().id;

    const [project, setProject] = useState({
        id: 0,
        service_id: 0,
        name: "",
        repo: "",
        deploy_file: "",
        branch: "",
        namespace: "",
    });

    const [activeTab, setActiveTab] = useState(0);

    const detailsTabRef = React.createRef();
    const timelinesTabRef = React.createRef();
    const commitsTabRef = React.createRef();
    const deploysTabRef = React.createRef();

    useEffect(() => {
        if (id == undefined || id < 1 || isNaN(id)) {
            notifications.sendError(`Project ID ${id} is not valid`);
            return null;
        }

        fetchProject(`${API_URL}/api/v1/projects/${id}`);
    }, []);

    async function fetchProject(path) {
        fetch(path).then(res => {
            if (!res.ok) {
                throw new Error(`Project ${id} not found`);
            }
            return res.json();
        }).then(data => {
            if (data == undefined || data == null) {
                // project not found
                notifications.sendError(`Project ${id} not found`);
                return null;
            }
            
            if (data.length > 0) { // Duplicate names, it's possible...
                setProject(data[0]);
            }

            setProject(data);
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
                        {project.name == "" ? name : project.name}
                        <div className="right">
                            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><GithubIcon /></a>}
                        </div>
                    </Text>
                </TextContent>
            </PageSection>

            <Tabs
                mountOnEnter
                activeKey={activeTab}
                onSelect={handleTabClick}
                isBox={false}
                aria-label="Tabs of project information"
                role="region"
                style={{overflow: "visible"}}
            >
                <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>} tabContentId="detailsTabContent" tabContentRef={detailsTabRef} />

                <Tab eventKey={1} title={<TabTitleText>Timeline</TabTitleText>} tabContentId="timelinesTabContent" tabContentRef={timelinesTabRef} />

                <Tab eventKey={2} title={<TabTitleText>Commits</TabTitleText>} tabContentId="commitsTabContent" tabContentRef={commitsTabRef} />

                <Tab eventKey={3} title={<TabTitleText>Deploys</TabTitleText>} tabContentId="deploysTabContent" tabContentRef={deploysTabRef} />
            </Tabs>

            <>
                <TabContent
                    eventKey={0}
                    id="detailsTabContent"
                    ref={detailsTabRef}
                    aria-label={`Details for ${project.name}`}
                >
                    <PageSection variant={PageSectionVariants.light}>
                        <TextContent>
                            <TextList component={TextListVariants.dl}>
                                <TextListItem component={TextListItemVariants.dt}>Service</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>TODO</TextListItem>
                                <TextListItem component={TextListItemVariants.dt}>DeployFile</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>{project.deploy_file ? project.deploy_file : NONE_SPECIFIED}</TextListItem>
                                <TextListItem component={TextListItemVariants.dt}>Namespace</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>{project.namespace ? project.namespace : NONE_SPECIFIED}</TextListItem>
                                <TextListItem component={TextListItemVariants.dt}>Branch</TextListItem>
                                <TextListItem component={TextListItemVariants.dd}>{project.branch ? project.branch : NONE_SPECIFIED}</TextListItem>
                            </TextList>
                        </TextContent>
                    </PageSection>
                </TabContent>

                {project.name != "" && <>
                    <TabContent 
                        eventKey={1} 
                        id="timelinesTabContent"
                        ref={timelinesTabRef}
                        aria-label={`Timeline display for ${project.name}`}
                        hidden
                    >
                        <Timelines dataPath={`/api/v1/projects/${id}/timelines`} repo={project.repo} />
                    </TabContent>
                    <TabContent
                        eventKey={2}
                        id="commitsTabContent"
                        ref={commitsTabRef}
                        aria-label={`Commits display for ${project.name}`}
                        hidden
                    >
                        <CommitTable key={project.id} dataPath={`/api/v1/projects/${id}/commits`} repo={project.repo} />
                    </TabContent>
                    <TabContent
                        eventKey={3}
                        id="deploysTabContent"
                        ref={deploysTabRef}
                        aria-label={`Deploys display for ${project.name}`}
                        hidden
                    >
                        <DeployTable key={project.name} dataPath={`/api/v1/projects/${id}/deploys`} />
                    </TabContent>
                </>}
            </>     
        </>
    );
}

