import React from 'react';
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Caption,
  RowSelectVariant
} from '@patternfly/react-table';

import Pagination from 'Pagination';

class GenericTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      dataPath: props.dataPath,
      title: props.title,
      activeSortIndex: -1,
      activeSortDirection: "none",
      link: props.link,
      cellFunction: props.cellFunction,
      columnFunction: props.columnFunction,
      page: 1,
      perPage: 10
    }
  }

  componentDidMount() {
    this.getModel();
  }

  getModel() {
    fetch(this.state.dataPath).then(res => res.json()).then(data => {
      if (data.length > 0) {
        this.setState({
          columns: Object.keys(data[0]),
          rows: data.map(d => Object.values(d))
        });
      }
    });
  }

  render() {
    const onSort = (event, index, direction) => {
      this.state.activeSortIndex = index;
      this.state.activeSortDirection = direction;
      // sorts the rows
      const updatedRows = this.state.rows.sort((a, b) => {
        if (typeof a[index] === 'number') {
          // numeric sort
          if (direction === 'asc') {
            return a[index] - b[index];
          }
          return b[index] - a[index];
        } else {
          // string sort
          if (direction === 'asc') {
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
      <React.Fragment>
        <TableComposable>
          <Caption>
            {this.state.title}
            <Pagination page={this.state.page} perPage={this.state.perPage} onSetPage={onSetPage} onPerPageSelect={onPerPageSelect} itemCount={this.state.rows.length} />
          </Caption>
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
      </React.Fragment>
    );
  }
}

export default GenericTable;
