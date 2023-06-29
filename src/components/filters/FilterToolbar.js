import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Select, SelectOption } from '@patternfly/react-core';

import "./FilterToolbar.css";

import Chips from './Chips';
import FilterModal from './FilterModal';
import FilterContext from './FilterContext';

function FilterToolbar() {
    const filterContext = useContext(FilterContext);
    const options = filterContext.options;
    const filters = filterContext.filters;
    const setFilters = filterContext.setFilters;
    const show = filterContext.show;

    const [selected, setSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const stringify = (filter) => {
        return Object.entries(filter).map(([key, value]) => `${key}=${value}`)[0];
    };

    // eslint-disable-next-line no-unused-vars
    const removeFilter = (arr, toRemove) => {
        return arr.filter(item => stringify(item) !== stringify(toRemove));
    };

    const onToggleFn = (isOpen) => { setIsOpen(isOpen); !isModalOpen && setSelected([]); };

    const onSelectFn = (e, selection) => {
        selected.filter(item => item === selection).length > 0 ?
            setSelected(selected.filter(item => item !== selection)) :
            setSelected([...selected, selection]);
    };

    const onCancelFn = () => { setModalOpen(false); onToggleFn(); };

    const onDeleteFn = (chip, type) => {
        setFilters(filters.filter(function(filter) { 
            return !(filter.field == type && filter.value == chip);
        }));
    };

    const onApplyFn = (fils) => {
        setFilters([...filters, ...fils]);
        setModalOpen(false);
        onToggleFn();
    };

    useEffect(() => {
        setFilters(filters);
    }, [filters]);

    return (
        <>
            {show && <div className='pc-filter-toolbar'>
                    {isModalOpen && <FilterModal
                        isOpen={isModalOpen}
                        options={selected}
                        onApplyFn={onApplyFn}
                        onCancelFn={onCancelFn}
                    />}
                    <Select
                        className='pc-filter-toolbar__selector'
                        variant='checkbox'
                        selections={selected}
                        isPlain
                        onToggle={onToggleFn}
                        onSelect={onSelectFn}
                        isOpen={isOpen}
                        placeholderText='Add Filters'
                        isCheckboxSelectionBadgeHidden
                    >
                        {options.map((option, key) => <SelectOption key={key} value={option}/>)}
                        <Divider/>
                        <Button variant='link' isDisabled={selected.length === 0} onClick={() => setModalOpen(true)}>
                            Enter Filter Values
                        </Button>
                    </Select>
                    <Chips filters={filters} options={options} onDelete={onDeleteFn} />
                </div>
            }
        </>
    );
}

export default FilterToolbar;