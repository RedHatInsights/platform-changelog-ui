import React from 'react';
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Caption
} from '@patternfly/react-table';

import Pagination from 'Pagination';
import { 
  PageSection, 
  Toolbar, 
  ToolbarContent, 
  ToolbarItem, 
  ToolbarItemVariant 
} from '@patternfly/react-core';

const DESC = 'desc';
const ASC = 'asc';

class GenericTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      dataPath: props.dataPath,
      title: props.title,
      activeSortIndex: -1,
      activeSortDirection: DESC,
      link: props.link,
      cellFunction: props.cellFunction,
      columnFunction: props.columnFunction,
      page: 1,
      perPage: 10
    }
  }

  setModel(data) {
    if (data.length > 0) {
      this.setState({
        columns: Object.keys(data[0]),
        rows: data.map(d => Object.values(d))
      });
    }
  }

  componentDidMount() {
    if (this.props.data === null || this.props.data === undefined) {
      this.getModel();
    }
    else {
      if (this.props.data.length > 0) {
        this.setModel(this.props.data);
      } else {
        this.setState({
          columns: [],
          rows: []
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.data !== undefined
      && this.props.data !== null 
      && this.props.data !== prevProps.data
    ) {
      this.setModel(this.props.data);
    }
  }

  getModel() {
    fetch(this.state.dataPath).then(res => res.json()).then(data => {
      this.setModel(data);
    });
  }

  render() {
    const onSort = (_event, index, direction) => {
      this.state.activeSortIndex = index;
      this.state.activeSortDirection = direction;
      // sorts the rows
      const updatedRows = this.state.rows.sort((a, b) => {
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
      this.setState({rows: updatedRows});
    };

    const onSetPage = (_event, /** @type {number} */ page) => {
      this.setState({page: page});
    };
  
    const onPerPageSelect = (_event, /** @type {number} */ perPage) => {
      if (perPage > this.state.rows.length) {
        this.setState({page: 1, perPage: perPage});
      } else {
        this.setState({perPage: perPage});
      }
    };

    const displayRow = (row, rowIndex) => {
      if (rowIndex >= (this.state.page - 1) * this.state.perPage && rowIndex < this.state.page * this.state.perPage) {
        return (
          <Tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              this.state.cellFunction(cell, row, this.state.columns, rowIndex, cellIndex)
            ))}
          </Tr>);
      }
      return null;
    }

    return (
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem variant={ToolbarItemVariant.label}>
              {this.state.title}
            </ToolbarItem>
            {this.state.rows.length > 0
              ? <ToolbarItem variant="pagination" alignment={{ default : 'alignRight'}}>
                  <Pagination 
                    page={this.state.page}
                    perPage={this.state.perPage} 
                    onSetPage={onSetPage} 
                    onPerPageSelect={onPerPageSelect} 
                    itemCount={this.state.rows.length} />
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
              {this.state.columns.map((column, columnIndex) => {
                // formatted column name
                let col = column;
                if (this.state.columnFunction) {
                  col = this.state.columnFunction(column);

                  if (col === null) return null;
                }

                const sortParams = {
                  sort: {
                    sortBy: {
                      index: this.state.activeSortIndex,
                      direction: this.state.activeSortDirection
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
          <Tbody>
            {this.state.rows.map((row, rowIndex) => (
              displayRow(row, rowIndex)
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    );
  }
}

export default GenericTable;
