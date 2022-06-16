import React from 'react';
import GenericTable from './GenericTable';
import Moment from 'react-moment';

import {Td} from '@patternfly/react-table';

function CommitTable({dataPath = "/api/v1/commits"}) {

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
            cellContents 
              = <a href={cell}>
                    <img className="smallIcon centered vertical" src="./images/merge.png" alt="Ref" />
                </a>;
        } else if (column === "Timestamp") {
            cellContents = <Moment date={cell} />;
        } else {
            cellContents = <>{cell}</>;
        }

        return TableCell(cellContents, column, rowIndex, cellIndex);
    }
    return (
        <GenericTable title="Commits" dataPath={dataPath} cellFunction={FormatCell} columnFunction={FormatColumn} />
    );
}

export default CommitTable;
