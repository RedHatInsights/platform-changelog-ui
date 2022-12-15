import React, { useEffect, useState } from 'react';

import { CSVLink } from 'react-csv';

import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import { ExportIcon, ExportIconConfig } from '@patternfly/react-icons';

function Export({rows, columns}) {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [filename, setFilename] = useState("export.csv");

    useEffect(() => {
        var temp = convertToCSV(rows, columns);
        if (temp !== undefined) {
            setData(temp);
        }
    }, [rows, columns]);

    return <Dropdown
        onSelect={() => {
            setOpen(false);
            setFilename(getFilename());
        }}
        toggle={
            <DropdownToggle
                toggleIndicator={null}
                onToggle={() => setOpen(!isOpen)}
            >
                <ExportIcon/>
            </DropdownToggle>
        }
        isOpen={isOpen}
        position='left'
        isPlain
        dropdownItems={[
            <DropdownItem key={0}>
                <CSVLink data={data} filename={filename}>
                    Export CSV
                </CSVLink>
            </DropdownItem>
        ]}
    />;
};

// convert between the table's row and column format and the CSV format
function convertToCSV(rows, columns) {
    const csv = [];

    // add the header row
    csv.push(columns);

    // add the data rows
    rows.forEach(row => {
        columns.forEach((column, index) => {
            // all formatting listed here
            if (column === "latest_commit" || column === "latest_deploy") {
                // check if latest is null
                if (row[index] === null || row[index].id === 0) {
                    row[index] = "";
                } else {
                    row[index] = row[index].timestamp;
                }
            }
        });

        csv.push(row);
    });

    return csv;
}

function getFilename() {
    // set the filename to `changelog-<date>.csv`
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return `changelog-${month}-${day}-${year}.csv`;
}

export default Export;