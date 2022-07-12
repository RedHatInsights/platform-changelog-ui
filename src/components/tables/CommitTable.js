import React, { useEffect } from 'react';

import Moment from 'react-moment';

import { Td } from '@patternfly/react-table';

import GenericTable from './GenericTable';
import CommitRow from './rows/CommitRow';

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

    return (
        <GenericTable title="Commits" data={data} dataPath={dataPath} rowElement={CommitRow} columnFunction={FormatColumn} />
    );
}

export default CommitTable;
