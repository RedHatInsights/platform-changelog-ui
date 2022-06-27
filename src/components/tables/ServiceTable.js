import React from 'react';

import {Td} from '@patternfly/react-table';

import { NavLink } from 'react-router-dom';

import GenericTable from './GenericTable';
import { Icon } from 'components';

function ServiceTable({dataPath = "/api/v1/services"}) {
    function FormatColumn(column) {
        if (column === "ID") {
            return null;
        } else if (column === "Name") {
            return null;
        } else if (column === "DisplayName") {
            return "Service";
        } else if (column === "GHRepo") {
            return "GitHub";
        } else if (column === "GLRepo") {
            return "GitLab";
        } else if (column === "DeployFile") {
            return "Deploy File";
        }
        return column;
    }

    // just adds the Td element around the content
    function TableCell(contents, column, rowIndex, cellIndex) {
        return <Td key={`${rowIndex}_${cellIndex}`} dataLabel={column}>{contents}</Td>
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex) {
        const column = columns[cellIndex];
    
        // do not display the id columns
        if (column === "ID" || column === "Name") {
            return null;
        } 

        let cellContents;
        
        if (column === "DisplayName") {
            cellContents = <NavLink to={`/services/${row[1]}`}>{cell}</NavLink>;
        } else if (column === "GHRepo") {
            cellContents = <Icon github link={cell} />;
        } else if (column === "GLRepo") {
            cellContents = <Icon gitlab link={cell} />;
        } else if (column === "MergedBy") {
            cellContents = <>Merged By</>;
        } else {
            cellContents = <>{cell}</>;
        }
        return TableCell(cellContents, column, rowIndex, cellIndex);
    }

    return (
        <GenericTable 
            title = "Services"
            dataPath ={dataPath}
            link cellFunction={FormatCell}
            columnFunction={FormatColumn} />
    );
}

export default ServiceTable;
