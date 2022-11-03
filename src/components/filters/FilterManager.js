import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import { FILTER_MAP, COMMIT_FILTERS, DEPLOY_FILTERS } from '../../AppConstants';
import { SingleRegex } from '../../utils/Regex';

import FilterContext from './FilterContext';
import FilterToolbar from './FilterToolbar';

export default function FilterManager(props) {
    const path = props.path;
    // filters currently applied
    const [filters, setFilters] = useState([]);
    // the filter options for the current path
    const [options, setOptions] = useState([]);
    const [show, setShow] = useState(false);

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

    function getFilters() {
        return filters;
    }

    function clear() {
        setFilters([]);
    }

    return (
        <FilterContext.Provider value={{ filters, clear }}>
            { show && <FilterToolbar options={options} filters={filters} setFilters={setFilters} /> }
            { props.children }
        </FilterContext.Provider>
    )
}