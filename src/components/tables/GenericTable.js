import React, { useEffect } from 'react';

import {
  ExpandableRowContent,
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@patternfly/react-table';

import {
    PageSection,
    TextContent,
    TextListVariants,
    TextListItemVariants,
    TextListItem,
    TextList,
    Toolbar, 
    ToolbarContent, 
    ToolbarItem, 
    ToolbarItemVariant 
} from '@patternfly/react-core';

import Pagination from './Pagination';

const DESC = 'desc';
const ASC = 'asc';

const NONE_SPECIFIED = "None specified";

function GenericTable({title = "", dataPath = "", link = "", cellFunction = null, columnFunction = null}) {
    const [ data, setData ] = React.useState([]);
    const [ columns, setColumns ] = React.useState([]);
    const [ rows, setRows ] = React.useState([]);
    const [ expandedCells, setExpandedCells ] = React.useState({});
    const [ activeSortIndex, setActiveSortIndex ] = React.useState(-1);
    const [ activeSortDirection, setActiveSortDirection ] = React.useState(DESC);
    const [ page, setPage ] = React.useState(1);
    const [ perPage, setPerPage ] = React.useState(10);

    function fetchData() {
        fetch(dataPath).then(res => res.json()).then(data => {
            if (data !== undefined && data !== null && data.length > 0) {
                setColumns(Object.keys(data[0]));
                setRows(data.map(d => Object.values(d)));
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, [data]);

    const onSort = (_event, index, direction) => {
        setActiveSortIndex(index);
        setActiveSortDirection(direction);

        // sorts the rows
        const updatedRows = rows.sort((a, b) => {
            if (typeof a[index] === 'number') {
                // numeric sort
                if (direction === ASC) {
                    return a[index] - b[index];
                }
                
                return b[index] - a[index];
                
            } else {
                // string sort
                if (direction === ASC) {
                    if (a[index]) {
                        return a[index].localeCompare(b[index]);
                    }
                }
                if (b[index]) {
                    return b[index].localeCompare(a[index]);
                }
            }
        });
        setRows(updatedRows);
    };

    const onSetPage = (_event, /** @type {number} */ page) => {
        setPage(page);

        // reset expanded cells
        setExpandedCells({});
    };
  
    const onPerPageSelect = (_event, /** @type {number} */ perPage) => {
        if (perPage > rows.length) {
            setPage(1);
            setPerPage(perPage);

            // reset expanded cells
            setExpandedCells({});
        } else {
            setPerPage(perPage);
        }
    };

    const setCellExpanded = (rowIndex, columnIndex, expanded) => {
        const newExpandedCells = {
            ...expandedCells
        };

        if (!expanded) {
            newExpandedCells[rowIndex] = columnIndex;
        } 
        else {
            delete newExpandedCells[rowIndex];
        }

        setExpandedCells(newExpandedCells);
    };

    const compoundExpandParams = (rowIndex, columnIndex) => ({
        isExpanded: expandedCells[rowIndex] === columnIndex,
        onToggle: () => setCellExpanded(rowIndex, columnIndex, expandedCells[rowIndex] === columnIndex)
    });

    return (
        <PageSection>
            <Toolbar>
                <ToolbarContent>
                    <ToolbarItem variant={ToolbarItemVariant.label}>
                        {title}
                    </ToolbarItem>
                    {rows.length > 0 
                        ? <ToolbarItem variant="pagination" alignment={{ default : 'alignRight'}}>
                            <Pagination 
                            page={page}
                            perPage={perPage} 
                            onSetPage={onSetPage} 
                            onPerPageSelect={onPerPageSelect} 
                            itemCount={rows.length} />
                        </ToolbarItem>
                        : <ToolbarItem variant={ToolbarItemVariant.label} alignment={{default : "alignRight"}}>
                            No rows found
                        </ToolbarItem>
                    }
                </ToolbarContent>
            </Toolbar>
            <TableComposable>
                <Thead>
                    <Tr>
                        {columns.map((column, columnIndex) => {
                            // formatted column name
                            let col = column;

                            if (columnFunction) {
                                col = columnFunction(column);

                                if (col === null) return null;
                            }

                            const sortParams = {
                                sort: {
                                    sortBy: {
                                        index: activeSortIndex,
                                        direction: activeSortDirection
                                    },
                                    onSort,
                                    columnIndex
                                }
                            };

                            return (
                                <Th key={columnIndex} {...sortParams}>{col}</Th>
                            );
                        })}
                    </Tr>
                </Thead>
                {rows.map((row, rowIndex) => (
                    rowIndex >= (page - 1) * perPage 
                    && rowIndex < page * perPage) && (
                        <Tbody key={`${rowIndex}`} isExpanded={!!expandedCells[rowIndex]}>
                            <Tr key={`${rowIndex}_row`}>
                                {row.map((cell, cellIndex) => (
                                    cellFunction(cell, 
                                        row, 
                                        columns, 
                                        rowIndex, 
                                        cellIndex, 
                                        compoundExpandParams)
                                ))}
                            </Tr>
                            {expandedCells[rowIndex] !== undefined ?
                                <Tr key={`${rowIndex}_expanded`} isExpanded={true}>
                                    <Td key={`${expandedCells[rowIndex]}_expanded`} dataLabel={columns[expandedCells[rowIndex]]} colSpan={columns.length}>
                                        <ExpandableRowContent>
                                            <Expandable column={columns[expandedCells[rowIndex]]} object={row[expandedCells[rowIndex]]}/>
                                        </ExpandableRowContent>
                                    </Td>
                                </Tr> : null
                            }
                        </Tbody>
                    )
                )}
            </TableComposable>
        </PageSection>
    );
}

// : columns[expandedCells[rowIndex]] === "deploys"
// ? <DeployExpandable deploy={row[expandedCells[rowIndex]][0]}/> 
// : row[expandedCells[rowIndex]]

function Expandable({ column = "", object }) {
    return (
        <>
            {   column == 'latest_commit' ? <CommitExpandable commit={object}/> :
                column == 'latest_deploy' ? <DeployExpandable deploy={object}/> :
                    <div>{object}</div>
            }
        </>
    )
}
/**
 * Make these use patternfly's TextList components
 */
function CommitExpandable({commit}) {

    return (
        <TextContent>
            <TextList component={TextListVariants.dl}>
                <TextListItem component={TextListItemVariants.dt}>Author</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{commit.author ? commit.author : NONE_SPECIFIED}</TextListItem>

                <TextListItem component={TextListItemVariants.dt}>Message</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{commit.message ? commit.message : NONE_SPECIFIED}</TextListItem>

                <TextListItem component={TextListItemVariants.dt}>Reference</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{commit.ref ? commit.ref : NONE_SPECIFIED}</TextListItem>
            </TextList>
        </TextContent>
    );
}

function DeployExpandable({deploy}) {

    return (
        <TextContent>
            <TextList component={TextListVariants.dl}>
                <TextListItem component={TextListItemVariants.dt}>Cluster</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{deploy.cluster ? deploy.cluster : NONE_SPECIFIED}</TextListItem>

                <TextListItem component={TextListItemVariants.dt}>Image</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{deploy.image ? deploy.image : NONE_SPECIFIED}</TextListItem>

                <TextListItem component={TextListItemVariants.dt}>Reference</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{deploy.ref ? deploy.ref : NONE_SPECIFIED}</TextListItem>
            </TextList>
        </TextContent>
    );
}

export default GenericTable;
