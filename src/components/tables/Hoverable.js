import React, { useEffect, useState, useContext } from 'react';

import { Button, Tooltip } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

import { FilterContext } from 'components/filters';

export default function Hoverable(props) {
    const filter = props.filter;
    const value = props.value;

    const filterContext = useContext(FilterContext);

    const [isHovered, setHover] = useState(false);

    const clickHandler = ()  => {
        filterContext.addFilter(filter, value);
    };

    return (
        <Tooltip content={value}>
            <Button
                onClick={clickHandler}
                variant='plain'
                onMouseOver={ () => setHover(true) }
                onMouseOut={ () => setHover(false) }
            >
                {props.children}
                {<PlusCircleIcon visibility={isHovered ? 'visible' : 'hidden'} />}
            </Button>
        </Tooltip>
    );
};