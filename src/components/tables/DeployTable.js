import React from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import { CodeBranchIcon } from '@patternfly/react-icons';

import GenericTable from './GenericTable';

function DeployTable({data = undefined, dataPath = "/api/v1/deploys"}) {
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

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = columns[cellIndex];
   
        let expandable = false;

        // do not display the id or serviceID columns
        if (column === "ID" || column === "ServiceID") {
            return null;
        }

        let cellContents;
        
        if (column === "Ref") {
            // a link to the commit, so this function needs a service's url
            // can a project have a GL and a GH repo?
            const icon = <CodeBranchIcon key="icon" />;

            cellContents = <>{icon}</>;
            expandable = true;

        } else if (column === "Timestamp") {
            cellContents = <Moment date={cell} />;
        } else {
            cellContents = <>{cell}</>;
        }

        return <Td key={`${rowIndex}_${cellIndex}`} 
                dataLabel={column} compoundExpand={expandable && compoundExpandParams != null ? compoundExpandParams(rowIndex, cellIndex) : null}>
                    {cellContents}
                </Td>;
    }

    return (
        <GenericTable title="Deploys" provideData={data} dataPath={dataPath} cellFunction={FormatCell} columnFunction={FormatColumn} />
    );
}

export default DeployTable;
