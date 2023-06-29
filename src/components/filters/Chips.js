import React, { useEffect, useState } from 'react';

import "./Chips.css";

import { Chip, ChipGroup } from '@patternfly/react-core';

export default function Chips ({ filters, onDelete }) {
    const [chips, setChips] = useState({});
   
    useEffect(() => {
        // map dict of { field, value } to { field: [value1, value2, ...] }
        setChips(filters.reduce((acc, curr) => {
            const { field, value } = curr;
            acc[field] = acc[field] ? [...acc[field], value] : [value];
            return acc;
            }, {}));
    }, [ filters ]);

    return (
        <div className='pc-c-toolbar__chips'>
            {Object.entries(chips).map(([type, chipArr], group) => {
            return chipArr.length > 0 && <ChipGroup key={group} categoryName={type}>
                {chipArr.map((chip, index) => {
                    return (
                        <div key={`${group}.chip`} className='pc-c-toolbar__chip'>
                            <Chip key={`${group}.${index}`}
                                onClick={() => onDelete(chip, type)}>
                                {chip}
                            </Chip>
                        </div>
                    );
                })}
            </ChipGroup>;})}  
        </div>
    )
}
