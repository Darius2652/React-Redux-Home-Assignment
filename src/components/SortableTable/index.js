import React from 'react';
import SortableItems from './SortableItems';
import SortableColumns from './SortableColumns';
import ColumnSortAnimator from './ColumnSortAnimator';
import './table.css';
import uniqueRowIdentifier from './uniqueRowIdentifier';

const SortableTable = ({ store }) => {
  let state = store.getState();
  let columns = state.columns;
  let rows = state.rows;
  
  const onListSortEnd = ({ oldIndex, newIndex }) => {
    store.dispatch({
      type: 'rows/sort',
      oldIndex,
      newIndex,
    })

    localStorage.setItem('tablestore:row-order', JSON.stringify(store.getState().rows.map(uniqueRowIdentifier)));
  };

  const onColumnSortEnd = ({ oldIndex, newIndex }) => {
    store.dispatch({
      type: 'columns/sort',
      oldIndex,
      newIndex,
    })

    let columnOrder = {};
    store.getState().columns.forEach((c, i) => columnOrder[c] = i);
    localStorage.setItem('tablestore:column-order', JSON.stringify(columnOrder));
  };

  return (
    <table cellPadding="0" cellSpacing="0">
      <SortableColumns
        columns={columns}
        onSortEnd={onColumnSortEnd}
      />
        
      <SortableItems
        rows={rows}
        columns={columns}
        onSortEnd={onListSortEnd}
      />
    </table>
  );
}


export default SortableTable;