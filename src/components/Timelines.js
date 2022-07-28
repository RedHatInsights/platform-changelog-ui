import React, { useEffect } from 'react';

import {
    PageSection,
    PageSectionVariants,
    Toolbar, 
    ToolbarContent, 
    ToolbarItem, 
    ToolbarItemVariant 
} from '@patternfly/react-core';


import { TimelineCard } from './TimelineCard';

function Timelines({dataPath=`/api/v1/timelines`, include_repo = false}) {
    const [timelines, setTimelines] = React.useState([]);

    useEffect(() => {
        fetchTimelines(dataPath);
    }, []);

    function fetchTimelines(path) {
        fetch(path).then(res => res.json()).then(data => {
            if (data !== undefined && data !== null && data.length > 0) {
                setTimelines(data);
            }
        });
    }

    return (
        <PageSection>
            {timelines.map((timeline, index) => 
                <TimelineCard key={index} timeline={timeline} include_repo={include_repo}/>
            )}
        </PageSection>
    )
}

export default Timelines;