import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableColumnItem = SortableElement(({ column }) => (
  <th className={column.className}>{column.content}</th>
));

const SortableColumnContainer = SortableContainer(({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <SortableColumnItem
        key={`header-${column.field}`}
        index={index}
        column={column}
        />
      ))}
      <th className='sticky-sm-right'>Actions</th>
    </tr>
  </thead>
))


function SortableColumns({ columns, onSortEnd }) {
  return (
    <SortableColumnContainer
      axis={'x'}
      lockAxis='x'
      columns={columns}
      onSortEnd={onSortEnd}
    />
  );
}

export default SortableColumns;