import React, { useEffect, useRef, useCallback } from 'react';

import {
    PageSection,
    PageSectionVariants,
    Toolbar, 
    ToolbarContent, 
    ToolbarItem, 
    ToolbarItemVariant,
    Spinner,
} from '@patternfly/react-core';

import { TimelineCardWrapper as TimelineCard } from './TimelineCard';

const PER_CALL = 10;

function Timelines({dataPath=`/api/v1/timelines`, include_repo = false, gh_url="", gl_url=""}) {
    const [timelines, setTimelines] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchTimelines();
    }, []);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        if (offset >= count) {
            return;
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setLoading(true);
                setOffset(offset + PER_CALL);
                fetchTimelines();
            }
        }
        , { threshold: 0.5 });

        if (node) observer.current.observe(node);
    }, [loading]);

    function fetchTimelines() {
        fetch(`${dataPath}?offset=${offset}&limit=${PER_CALL}`).then(res => {
            if (!res.ok) {
                notifications.sendError(`Failed to fetch data.`, `${res.status}: ${res.statusText}`);
                return;
            }
            return res.json();
        }).then(data => {
            if (data !== undefined && data !== null && data.data.length > 0) {
                setTimelines([...timelines, ...data.data]);
                setCount(data.count);
            }
            setLoading(false);
        }).catch(error => {
            notifications.sendError(error.message);
        });
    }

    return (
        <PageSection style={{"height": "0px"}}>
            {timelines.map((timeline, index) => {
                let props = {
                    timeline: timeline,
                    include_repo: include_repo,
                    gh_url: gh_url,
                    gl_url: gl_url,
                };

                if (timelines.length === index + 1) {
                    return <TimelineCard key={index} ref={lastElementRef} {...props} />;
                }
                return <TimelineCard key={index} {...props} />;
            })}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px'}}>
                {loading && <Spinner isSVG aria-label="Timelines loading" />}
                {offset >= count && <div>No more timelines to load</div>}
            </div>
        </PageSection>
    )
}

export default Timelines;