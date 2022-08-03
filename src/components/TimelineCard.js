import React from 'react';
import {Card, CardTitle, CardBody, CardFooter} from '@patternfly/react-core';

const type = {commit: "Commit", deploy: "Deploy"};

export const TimelineCard = ({timeline, include_repo = false, gh_url="", gl_url=""}) =>
    <div style={timeline.type == "deploy" ? deployStyle : commitStyle}>
        <Card isCompact isFlat>
            {include_repo && <CardTitle>{timeline.repo}</CardTitle>}
            {timeline.type == "commit" &&
                <CardBody>
                    <p>Commit:&nbsp;
                        <a 
                            href={gh_url != "" 
                            ? `${gh_url}/commit/${timeline.ref}` 
                            : `${gl_url}/-/commit/${timeline.ref}`} 
                            target="_blank" 
                            rel="noreferrer noopener"
                        >
                            <b>{timeline.ref}</b>
                        </a>
                    </p>
                    <p>{timeline.author}</p>
                    <p>{timeline.message}</p>
                    <p>{timeline.timestamp}</p>
                </CardBody>
            }
            {timeline.type == "deploy" &&
                <CardBody>
                    <p><b>Deploy</b></p>
                    <p>Namespace: {timeline.namespace}</p>
                    <p>Cluster: {timeline.cluster}</p>
                    <p>Status: {timeline.status}</p>
                    <p>Timestamp: {timeline.timestamp}</p>
                </CardBody>
            }
        </Card>
    </div>;

var commitStyle = {
    width: "60%",
    marginLeft: "10%",
    paddingBottom: "10px",
}

var deployStyle = {
    width: "60%",
    marginLeft: "30%",
    paddingBottom: "10px",
}