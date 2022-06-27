import React, { useEffect } from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import GenericTable from './GenericTable';

/**
 * Options to pass in the desired data or the data path to the table
 */
function CommitTable({data = undefined, dataPath = "/api/v1/commits", gh_url="", gl_url=""}) {

    function FormatColumn(column) {
        if (column === "ID") {
            return null;
        } else if (column === "ServiceID") {
            return null;
        } else if (column === "Repo") {
            return "Repository";
        }
        return column;
    }

    // just adds the Td element around the content
    function TableCell(contents, column, rowIndex, cellIndex) {
        return <Td key={`${rowIndex}_${cellIndex}`} dataLabel={column}>{contents}</Td>
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex) {
        const column = columns[cellIndex];

        // do not display the id or serviceID columns
        if (column === "ID" || column === "ServiceID") {
            return null;
        }

        let cellContents;
        
        if (column === "Ref") {
            // a link to the commit, so this function needs a service's url
            // can a project have a GL and a GH repo?
            const image = <img className="smallIcon centered vertical" src="/images/merge.png" alt="Ref" />

            // example: https://github.com/RedHatInsights/rhsm-subscriptions/commit/{Ref}
            if (gh_url !== "") {
                cellContents = <a href={`${gh_url}/commit/${cell}`}>{image}</a>;
            } 
            else if (gl_url !== "") { // example: https://gitlab.cee.redhat.com/service/app-interface/-/commit/{Ref}
                cellContents = <a href={`${gl_url}/-/commit/${cell}`}>{image}</a>; // might want to handle if the url has a / at the end, too.
            } 
            else {
                cellContents = <a href={cell}>{image}</a>;
            }

        } else if (column === "Timestamp") {
            cellContents = <Moment date={cell} />;
        } 
        else {
            cellContents = <>{cell}</>;
        }

        return TableCell(cellContents, column, rowIndex, cellIndex);
    }

    return (
        <GenericTable title="Commits" data={data} dataPath={dataPath} cellFunction={FormatCell} columnFunction={FormatColumn} />
    );
}

export default CommitTable;
