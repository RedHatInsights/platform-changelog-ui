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

class GenericTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      path: props.path,
      title: props.title,
      activeSortIndex: -1,
      activeSortDirection: "none"
    }
  }

  componentDidMount() {
    this.getModel();
  }

  getModel() {
    fetch(this.state.path).then(res => res.json()).then(data => {
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

    return (
      <React.Fragment>
        <TableComposable>
          <Caption>{this.state.title}</Caption>
          <Thead>
            <Tr>
              {this.state.columns.map((column, columnIndex) => {
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
                  <Th key={columnIndex} {...sortParams}>
                    {column}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {this.state.rows.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Td key={`${rowIndex}_${cellIndex}`} dataLabel={this.state.columns[cellIndex]}>
                    {cell}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </React.Fragment>
    );
  }
}

export default GenericTable;
