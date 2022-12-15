import React, { useContext } from 'react';

import {Td} from '@patternfly/react-table';

import { GithubIcon, GitlabIcon, CodeBranchIcon } from '@patternfly/react-icons';

import { NavLink } from 'react-router-dom';

import Moment from 'react-moment';

import { FilterContext } from 'components/filters';

import GenericTable from './GenericTable';
import Hoverable from './Hoverable';

import { expandedServicesSchema } from 'schema';

function ServiceTable({dataPath = "/api/v1/services", includeExport = true}) {
    const filterContext = useContext(FilterContext);

    function FormatColumn(column) {
        const formatted = expandedServicesSchema[column]
        return formatted === undefined ? null : formatted;
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = expandedServicesSchema[columns[cellIndex]];
    
        // do not display the id columns
        if (column === undefined) {
            return null;
        }

        let expandable = false;
        
        // if the column is filterable (and not a link already),
        // wrap the contents in a hoverable
        let hoverable = false;

        let cellContents;

        let width = 0; // percentage modifier for the cell width
        
        if (cell == "") {
            cellContents = <>{cell}</>
        } else if (column === "Name") {
            cellContents = <NavLink to={`/services/${row[1]}`}>{cell}</NavLink>;
        } else if (column === "Github") {
            width = 10;
            cellContents =  <a href={cell} target="_blank" rel="noreferrer">
                                <GithubIcon key="icon" />
                            </a>;
        } else if (column === "Gitlab") {
            width = 10;
            cellContents = <a href={cell} target="_blank" rel="noreferrer">
                                <GitlabIcon key="icon" />
                            </a>;
        } else if (column === "Latest commit") {
            if (cell !== null && cell.id !== 0) {
                cellContents = <><CodeBranchIcon /><Moment date={cell.timestamp} format=" MM/YYYY"/></>;
                expandable = true;
            }
        } else if (column === "Latest deploy") {
            if (cell !== null && cell.id !== 0) {
                cellContents = <><CodeBranchIcon /><Moment date={cell.timestamp} format=" MM/YYYY"/></>;
                expandable = true;
            }
        } else {
            cellContents = <>{cell}</>;
            hoverable = true;
        }
        
        // if you can filter by the column, wrap the contents in hoverable
        if (hoverable && filterContext.checkOptions(column)) {
            cellContents = <Hoverable filter={column} value={cell} >{cellContents}</Hoverable>
        }

        return <Td key={`${rowIndex}_${cellIndex}`} 
                    dataLabel={column}
                    compoundExpand={expandable && compoundExpandParams != null ? compoundExpandParams(rowIndex, cellIndex) : null}
                >
                    {cellContents}
                </Td>
    }

    return (
        <GenericTable
            dataPath={dataPath}
            includeExport={includeExport}
            cellFunction={FormatCell}
            columnFunction={FormatColumn} />
    );
}

export default ServiceTable;
