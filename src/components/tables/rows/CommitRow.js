import React, { useEffect } from 'react';

import Moment from 'react-moment';

import { ExpandableRowContent, Tbody, Td, Tr } from '@patternfly/react-table';

export default function CommitRow({row, columns, rowIndex, gh_url="", gl_url=""}) {
    const [expandedCell, setExpandedCell] = React.useState(-1);

    const compoundExpandParams = (cellIndex) => ({
        isExpanded: cellIndex === expandedCell,
        onToggle: () => setExpandedCell(expandedCell === cellIndex ? -1 : cellIndex)
    });

    // just adds the Td element around the content
    function TableCell(contents, column, rowIndex, cellIndex, expandable) {
        console.log("TableCell: " + contents + " " + column + " " + rowIndex + " " + cellIndex + " " + expandable);
        return <Td key={`${rowIndex}_${cellIndex}`} 
                dataLabel={column} compoundExpand={expandable && compoundExpandParams(cellIndex)}>
                     {contents}
                </Td>
    }

    function FormatCell(cell, row, columns, rowIndex, cellIndex) {
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
            const image = <img key="image" className="smallIcon centered vertical" src="/images/merge.png" alt="Ref" />

            // example: https://github.com/RedHatInsights/rhsm-subscriptions/commit/{Ref}
            if (gh_url !== "") {
                cellContents = <a href={`${gh_url}/commit/${cell}`}>{image}</a>;
            } 
            else if (gl_url !== "") { // example: https://gitlab.cee.redhat.com/service/app-interface/-/commit/{Ref}
                cellContents = <a href={`${gl_url}/-/commit/${cell}`}>{image}</a>; // might want to handle if the url has a / at the end, too.
            } 
            else {
                cellContents = <>{image}</>;
            }

            expandable = true;

        } else if (column === "Timestamp") {
            cellContents = <Moment key="moment" date={cell} />;
        } else if (column === "Message") {
            return null;
        } else {
            cellContents = <div key={`${rowIndex}_${cellIndex}`}>{cell}</div>;
        }

        return TableCell(cellContents, column, rowIndex, cellIndex, expandable);
    }

    return (
        <Tbody key={`${rowIndex}_body`}>
            <Tr key={`${rowIndex}_row`}>
                {row.map((cell, cellIndex) => (
                    FormatCell(cell, row, columns, rowIndex, cellIndex)
                ))}
            </Tr>
            {expandedCell > -1 ?
                <Tr key={`${columns[expandedCell]}_expanded`} isExpanded={expandedCell > -1}>
                    {/* <Td key={`${columns[expandedCell]}`} dataLabel={columns[expandedCell]} noPadding colSpan={columns.length}>
                        <ExpandableRowContent>
                            
                        </ExpandableRowContent>
                    </Td> */}
                </Tr> : null
            }
        </Tbody>
    )

}