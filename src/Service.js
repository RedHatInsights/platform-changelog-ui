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

import CommitTable from "./CommitTable";
import DeployTable from "./DeployTable";
import Icon from "./Icon";

import { useParams } from "react-router-dom";
import Moment from 'react-moment';

const NONE_SPECIFIED = "None specified";
const NONE_FOUND = "None found";

export default function Service() {

    const name = useParams().name;

    const [service, setService] = useState({
        ID: 0, 
        Name: "",
        DisplayName: "",
        GHRepo: "",
        GLRepo: "", 
        DeployFile: "", 
        Namespace: "",
        Branch: "",
        Commits: [],
        Deploys: []
    });

    useEffect(() => {
        fetchService(`/api/v1/services/${name}`);
    }, []);

    async function fetchService(path) {
        fetch(path).then(res => res.json()).then(data => {
            if (data.length > 0) { // Duplicate names, it's possible...
                setService(data[0]);
            }
            if (data.Commits === null || data.Commits.length === 0) {
                data.Commits = [];
            }
            if (data.Deploys === null || data.Deploys.length === 0) {
                data.Deploys = [];
            }

            setService(data);
        }).catch(); // should do something with the error
    }

    return (
        <>
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <Text className="fullWidth" component="h1">
                        {service.DisplayName}
                        <div className="right">
                            {service.GHRepo && <Icon github link={service.GHRepo} />}
                            {service.GLRepo && <Icon gitlab link={service.GLRepo} />}
                        </div>
                    </Text>
                </TextContent>
            </PageSection>

            {/** Displays much of the service's metadata */}
            <PageSection variant={PageSectionVariants.light}>
                <TextContent>
                    <TextList component={TextListVariants.dl}>
                        <TextListItem component={TextListItemVariants.dt}>Namespace</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>{service.Namespace ? service.Namespace : NONE_SPECIFIED}</TextListItem>

                        <TextListItem component={TextListItemVariants.dt}>Branch</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>{service.Branch ? service.Branch : NONE_SPECIFIED}</TextListItem>
                        
                        <TextListItem component={TextListItemVariants.dt}>Lastest Commit</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}> {/** Assuming they will be sorted by date */}
                            {service.Commits.length > 0 ? <Moment date={service.Commits[0].Timestamp} /> : NONE_FOUND}
                        </TextListItem>
                        
                        <TextListItem component={TextListItemVariants.dt}>Lastest Deployment</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}> {/** Assuming they will be sorted by date */}
                            {service.Deploys.length > 0 ? <Moment date={service.Deploys[0].Timestamp} /> : NONE_FOUND}
                        </TextListItem>
                    </TextList>
                </TextContent>
            </PageSection>

            {/** Keys added to update the children with the new props */}
            <CommitTable data={service.Commits} gh_url={service.GHRepo} gl_url={service.GLRepo} key={service.ID} />
            <DeployTable data={service.Deploys} key={service.Name} />
        </>
    );
}

