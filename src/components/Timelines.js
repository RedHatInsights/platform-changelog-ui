import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    PageSection,
    PageSectionVariants,
    Toolbar, 
    ToolbarContent, 
    ToolbarItem, 
    ToolbarItemVariant,
    Spinner,
} from '@patternfly/react-core';

import { API_URL } from '../AppConstants';
import * as Utils from "../utils";

import { TimelineCardWrapper as TimelineCard } from './TimelineCard';

const PER_CALL = 10;

function Timelines({dataPath=`/api/v1/timelines`, includeRepo = false, ghURL="", glURL=""}) {
    const [timelines, setTimelines] = useState([]);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

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
        fetch(`${API_URL}${dataPath}?offset=${offset}&limit=${PER_CALL}`).then(res => {
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
                    includeRepo: includeRepo,
                    ghURL: ghURL,
                    glURL: glURL,
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