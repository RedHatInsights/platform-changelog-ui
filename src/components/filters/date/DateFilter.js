import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import {
    Bullseye,
    Button,
    Divider,
    Flex,
    FlexItem,
    Form,
    FormGroup,
    Modal,
    Radio,
    Tab,
    Tabs,
    Text,
    CalendarMonth
} from '@patternfly/react-core';
import { CaretLeftIcon, CaretRightIcon, ClockIcon } from '@patternfly/react-icons';

import moment from 'moment';

import { NotificationsContext } from 'components/notifications';
import { FilterContext } from 'components/filters';

import DateTextInput from './DateTextInput';

function DateFilter() {
    // uses the FilterContext to hold the start and end date
    const filterContext = useContext(FilterContext);
    const notifications = useContext(NotificationsContext);
    
    const location = useLocation();

    // if no date is selected, the date filter is not applied
    const [modified, setModified] = useState(false);

    const startDate = filterContext.startDate;
    const endDate = filterContext.endDate;

    const [selectedDate, setSelectedDate] = useState({start: moment(), end: moment()});

    const [isOpen, setOpen] = useState(false);
    const [isValidated, setValidation] = useState(true);
    
    const fromRef = useRef();
    const toRef = useRef();

    const setDates = () => {
        setOpen(!isOpen);
        const start = fromRef.current.getValue();
        const end = toRef.current.getValue();
        if (end >= start) {
            filterContext.setDate(new moment(start), new moment(end));
            setModified(true);
        } else {
            notifications.sendError(`Date Error`, `Start date must be before end date`);
        }
    };

    useEffect(() => {
        // if there is a start and end date, set the selected date
        if (startDate && endDate) {
            setModified(true);
        }
    }, [startDate, endDate]);

    return (
        <>
            {isOpen && <Modal
                isOpen={isOpen}
                onClose={() => setOpen(!isOpen)}
                title='Set date range'
                variant='large'
                actions={[
                    <Button
                        key="confirm"
                        variant="primary"
                        onClick={() => setDates()}
                        isDisabled={!isValidated}
                    >
                        Confirm
                    </Button>,
                    <Button key="cancel" variant="link" onClick={() => setOpen(!isOpen)}>
                        Cancel
                    </Button>
                ]}
            >
                <Bullseye>
                    <Form>
                        <Flex direction={{ default: 'row' }}>
                            <FormGroup label='From'>
                                <Flex direction={{ default: 'column' }}>
                                    <FlexItem>
                                        <DateTextInput
                                            ref={ fromRef }
                                            val={ selectedDate?.start }
                                            setValidation={ setValidation }
                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <CalendarMonth
                                            onChange={(day) => fromRef.current.setValue(moment(day, "LLL"))}
                                        />                                            
                                    </FlexItem>
                                </Flex>
                            </FormGroup>
                            <FormGroup label='To'>
                                <Flex direction={{ default: 'column' }}>
                                    <FlexItem>
                                        <DateTextInput
                                            ref={ toRef }
                                            val={ selectedDate?.end }
                                            setValidation={ setValidation }
                                        />
                                    </FlexItem>
                                    <FlexItem>
                                        <CalendarMonth
                                            onChange={(day) => toRef.current.setValue(moment(day, "LLL"))}
                                        />
                                    </FlexItem>
                                </Flex>
                            </FormGroup>
                        </Flex>
                    </Form>
                </Bullseye>
            </Modal>
            }
            <Button variant='inline' onClick={() => setOpen(!isOpen)}>
                <Flex direction={{ default: 'row' }} >
                    <FlexItem>
                        <ClockIcon/>
                    </FlexItem>

                    {modified &&
                        <FlexItem>
                            {startDate.local().format("MM/DD/YY h:mm A")} - {endDate.local().format("MM/DD/YY h:mm A")}
                        </FlexItem>}
                </Flex>
            </Button>
        </>
    );
};

export default DateFilter;