import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

// import moment
import moment from 'moment';

import { TextInput } from '@patternfly/react-core';

/* eslint-disable react/display-name */
const DateTextInput = forwardRef(({ val, setValidation }, ref) => {

    const [isValid, setTextValidation] = useState(false);
    const [currentValue, setCurrentValue] = useState(moment());

    const updateState = (validation) => {
        setTextValidation(validation);
        setValidation(validation);
    };

    function checkVal (newVal) {
        if (newVal) {
            newVal = newVal instanceof Object ? moment(newVal) : newVal;
            const valid = moment(newVal, 'LLL', true).isValid();
            valid ? updateState(true) : updateState(false);
        }
        setCurrentValue(newVal);
    }

    useEffect(() => {
        checkVal(val);
        setCurrentValue(val);
    }, [val, setCurrentValue]);

    useImperativeHandle(ref, () => ({
        setValue: (value) => {
            checkVal(value);
            setCurrentValue(value);
        },
        getValue: () => {
            return moment(currentValue);
        }
    }));

    return <TextInput
        aria-label='Date Input'
        value={currentValue.toLocaleString('en-US')}
        onChange={(val) => checkVal(val)}
        validated={isValid ? 'success' : 'error'}
    />;
});

export default DateTextInput;