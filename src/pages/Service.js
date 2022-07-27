import React, { useEffect, useState } from "react";

import {
    PageSection,
    PageSectionVariants,
    TextContent,
    Text,
    TextVariants,
    TextListVariants,
    TextListItemVariants,
    TextListItem,
    TextList
} from "@patternfly/react-core";
import { GithubIcon, GitlabIcon } from '@patternfly/react-icons';

import { useParams } from "react-router-dom";
import Moment from 'react-moment';

import {
    CommitTable,
    DeployTable,
} from 'components/tables';

const NONE_SPECIFIED = "None specified";
const NONE_FOUND = "None found";

export default function Service() {

    const name = useParams().name;

    const [service, setService] = useState({
        id: 0, 
        name: "",
        display_name: "",
        gh_repo: "",
        gl_repo: "", 
        deploy_file: "", 
        namespace: "",
        branch: "",
    });

    useEffect(() => {
        fetchService(`/api/v1/services/${name}`);
    }, []);

    async function fetchService(path) {
        fetch(path).then(res => res.json()).then(data => {
            if (data.length > 0) { // Duplicate names, it's possible...
                setService(data[0]);
            }

            setService(data);
        }).catch(); // should do something with the error
    }

    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text className="fullWidth" component="h1">
                        {service.display_name}
                        <div className="right">
                            {service.gh_repo && <a href={service.gh_repo} target="_blank" rel="noreferrer"><GithubIcon /></a>}
                            {service.gl_repo && <a href={service.gl_repo} target="_blank" rel="noreferrer"><GitlabIcon /></a>}
                        </div>
                    </Text>
                </TextContent>
            </PageSection>

            {/** Displays much of the service's metadata */}
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <TextList component={TextListVariants.dl}>
                        <TextListItem component={TextListItemVariants.dt}>Namespace</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>{service.namespace ? service.namespace : NONE_SPECIFIED}</TextListItem>

                        <TextListItem component={TextListItemVariants.dt}>Branch</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>{service.branch ? service.branch : NONE_SPECIFIED}</TextListItem>
                    </TextList>
                </TextContent>
            </PageSection>

            {/** Keys added to update the children with the new props */}
            <CommitTable key={service.id} dataPath={`/api/v1/services/${name}/commits`} gh_url={service.gh_repo} gl_url={service.gl_repo} />
            <DeployTable key={service.name} dataPath={`/api/v1/services/${name}/deploys`} />
        </>
    );
}

