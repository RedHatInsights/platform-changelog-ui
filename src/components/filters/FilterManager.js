import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import { FILTER_MAP, COMMIT_FILTERS, DEPLOY_FILTERS } from '../../AppConstants';
import { SingleRegex } from '../../utils/Regex';

import { NotificationsContext } from '../notifications';

import FilterContext from './FilterContext';
import FilterToolbar from './FilterToolbar';

export default function FilterManager(props) {
    const notifications = useContext(NotificationsContext);

    const location = useLocation();
    const search = location.search;
    const path = location.pathname;
    // filters currently applied
    const [filters, setFilters] = useState([]);
    // the filter options for the current path
    const [options, setOptions] = useState([]);
    const [show, setShow] = useState(false);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        getURLFilters();
    }, [options, search])

    useEffect(() => {
        let found = FILTER_MAP.find(( element, index ) =>
            SingleRegex({pattern: element.path, value: path}));

        if (!found) {
            setOptions([]);
            setShow(false);
        } else {
            setOptions(found.options);
            setShow(found.show);
        }

        setFilters([]);
    }, [ path ]);

    useEffect(() => {
        // if there has been a change in the filters, update the URL
        updateURLFilters();
    }, [filters, startDate, endDate]);

    function getURLFilters() {
        // get the URL search params
        const params = new URLSearchParams(search);

        // make the params the list of filters
        const newFilters = [];
        
        params.forEach((value, key) => {
            // search for the key in the options array, not case sensitive
            const option = options.find(option => option.toLowerCase() === key.toLowerCase());

            // check if the key value pair is already in the filters array
            const found = newFilters.find(filter => filter.field === option && filter.value === value);
            
            if (option && !found) {
                newFilters.push({field: option, value: value});
            }
            else {
                if (key.toLowerCase() === 'start_date') {
                    setStartDate(moment(value));
                } else if (key.toLowerCase() === 'end_date') {
                    setEndDate(moment(value));
                }
            }
        });

        setFilters(newFilters);
    }

    function updateURLFilters() {
        const params = new URLSearchParams();
        // add the filters to the params
        filters.forEach(filter => {
            params.append(filter.field.toLowerCase(), filter.value);
        })

        // add the start and end dates to the params
        if (startDate) {
            params.append('start_date', startDate.format());
        } if (endDate) {
            params.append('end_date', endDate.format());
        }

        // update the URL
        // don't include the ? if there are no filters
        if (params.toString() === '') {
            window.history.replaceState({}, '', `${path}`);
        } else {
            window.history.replaceState(
                {},
                '',
                `${path}?${params.toString()}`
            );
        }
    }

    function getFilters() {
        return filters;
    }

    // function for clickable fields
    // given the field name and the value, add the filter
    function addFilter(field, value) {
        // search for the key in the options array, not case sensitive
        let newFilter = {};

        let formatted = field.replace(/ /g,"_").toLowerCase();
        const option = options.find(option => option.toLowerCase() === formatted);

        // check if the key value pair is already in the filters array
        const found = filters.find(filter => filter.field === option && filter.value === value);

        if (option && !found) {
            newFilter = {field: option, value: value};
        } else {
            return;
        }

        setFilters([...filters, newFilter]);
    }

    function checkOptions(field) {
        let formatted = field.replace(/ /g,"_").toLowerCase();
        return options.find(option => option.toLowerCase() === formatted);
    }
        

    function setDate(start, end) {
        // set the start and end dates
        setStartDate(start);
        setEndDate(end);
    }

    function clear() {
        setFilters([]);
        setStartDate(moment());
        setEndDate(moment());
    }

    return (
        <FilterContext.Provider value={{ filters, options, startDate, endDate, getFilters, addFilter, checkOptions, setFilters, setDate, show, clear }}>
            { props.children }
        </FilterContext.Provider>
    )
}