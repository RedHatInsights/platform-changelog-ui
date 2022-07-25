import React from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import { CodeBranchIcon } from '@patternfly/react-icons';

import GenericTable from './GenericTable';

import { deploysSchema } from 'schema';

function DeployTable({dataPath = "/api/v1/deploys"}) {
    function FormatColumn(column) {
        const formatted = deploysSchema[column]
        return formatted === undefined ? null : formatted;
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex, compoundExpandParams = null) {
        const column = deploysSchema[columns[cellIndex]];

        // do not display the id or serviceID columns
        if (column === undefined) {
            return null;
        }

        let expandable = false;

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
        <GenericTable title="Deploys" dataPath={dataPath} cellFunction={FormatCell} columnFunction={FormatColumn} />
    );
}

export const deploys = {
    timestamp: 'Timestamp',
    repo: 'Repo',
    ref: 'Ref',
    namespace: 'Namespace',
    cluster: 'Cluster',
    image: 'Image',
}

export default DeployTable;
