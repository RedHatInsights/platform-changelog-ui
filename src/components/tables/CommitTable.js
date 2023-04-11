import React, { useEffect, useContext } from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import { CodeBranchIcon } from '@patternfly/react-icons';

import { FilterContext } from '../filters';

import GenericTable from './GenericTable';
import Hoverable from './Hoverable';

import { commitsSchema } from '../../schema';

/**
 * Options to pass in the desired data or the data path to the table
 */
function CommitTable({dataPath="/api/v1/commits", includeExport=true, ghURL="", glURL=""}) {
    const filterContext = useContext(FilterContext);

    function FormatColumn(column) {
        const formatted = commitsSchema[column]
        return formatted === undefined ? null : formatted;
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = commitsSchema[columns[cellIndex]];
   
        let expandable = false;
        
        if (column === undefined) {
            return null;
        }

        let cellContents;

        let hoverable = false;
        
        if (column === "Ref") {
            // a link to the commit, so this function needs a service's url
            // can a project have a GL and a GH repo?
            const icon = <CodeBranchIcon key="icon" />;

            // example: https://github.com/RedHatInsights/rhsm-subscriptions/commit/{Ref}
            if (ghURL !== "") {
                cellContents = <a href={`${ghURL}/commit/${cell}`} target="_blank" rel="noreferrer noopener">{icon}</a>;
            } 
            else if (glURL !== "") { // example: https://gitlab.cee.redhat.com/service/app-interface/-/commit/{Ref}
                cellContents = <a href={`${glURL}/-/commit/${cell}`} target="_blank" rel="noreferrer noopener">{icon}</a>; // might want to handle if the url has a / at the end, too.
            } 
            else {
                cellContents = <>{icon}</>;
                expandable = true;
            } 

        } else if (column === "Timestamp") {
            cellContents = <Moment date={cell} />;
        } else {
            cellContents = <>{cell}</>;
            hoverable = true;
        }

        // if you can filter by the column, wrap the contents in hoverable
        if (hoverable && filterContext.checkOptions(column)) {
            cellContents = <Hoverable filter={column} value={cell} >{cellContents}</Hoverable>
        }

        return <Td key={`${rowIndex}_${cellIndex}`} 
                dataLabel={column} compoundExpand={expandable && compoundExpandParams != null ? compoundExpandParams(rowIndex, cellIndex) : null}>
                    {cellContents}
                </Td>;
    }

    return (
        <GenericTable
            dataPath={dataPath} 
            includeExport = {includeExport}
            cellFunction={FormatCell} 
            columnFunction={FormatColumn} />
    );
}

export default CommitTable;
