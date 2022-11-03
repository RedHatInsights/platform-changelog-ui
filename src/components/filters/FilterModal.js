import './FilterModal.css';

import React, { useEffect, useState } from 'react';

import { Button, Form, FormGroup, Modal, TextInput } from '@patternfly/react-core';

export default function FilterModal({ isOpen, options, onApplyFn, onCancelFn }) {
    // toApply is the list of filters to be applied
    // array of dicts, each { field, value }
    const [toApply, setToApply] = useState([]);
    const [canApply, setCanApply] = useState(false);

    const updateValue = (value, option) => {
        setToApply(toApply.flatMap(item => item.field === option ? { "field": option, "value": value } : item));
    };

    const checkForEmptyValues = () => toApply.flatMap(item => Object.values(item).filter(value => value === '')).length > 0;

    useEffect(() => {
        setToApply(options.map(option => ({ "field": option, "value": "" })));
    }, [options]);

    useEffect(() => {
        checkForEmptyValues() ? setCanApply(false) : setCanApply(true);
    }, [toApply]);

    return <Modal
        title='Add Filters'
        width='50%'
        isOpen={isOpen}
        onClose={onCancelFn}
        actions={[
            <Button
                key="confirm" variant="primary" isDisabled={!canApply}
                onClick={() => toApply && onApplyFn(toApply)}>
                Apply
            </Button>,
            <Button key="cancel" variant="link" onClick={onCancelFn}>
                Cancel
            </Button>
        ]}
    >
        {toApply.length === options.length && <Form isHorizontal>
            {options.map((option, index) => <FormGroup key={index} label={option} isRequired>
                <TextInput
                    value={toApply[index].option}
                    type='text'
                    onChange={(value) => updateValue(value, option)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            !checkForEmptyValues() && onApplyFn(toApply);
                        }
                    }}
                />
            </FormGroup>)}
        </Form>}
    </Modal>;
};