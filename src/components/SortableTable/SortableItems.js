import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableListItem = SortableElement(({ row, columns, UID }) => (
  <tr data-uid={UID}>
      {columns.map((column, index) => (
        <td className={column.itemClassName} key={index}>
          {column.hasStatusIndicator ? <span className={`status-dot ${row.status ? `status-dot-${row.status}` : ''}`}></span> : null}
          {row[column.field]}
        </td>
      ))}
      <td className='sticky-sm-right padding-0'>
        <i className="las la-poll padding-2"></i>
        <i className="las la-ellipsis-v padding-2"></i>
      </td>
  </tr>
));

const SortableListContainer = SortableContainer(({ rows, columns, onSortEnd }) => (
  <tbody>
    {rows.map((row, index) => (
      <SortableListItem
        key={`item-${row.workerName}-${index}`}
        UID={`item-${row.workerName}-${index}`}
        index={index}
        row={row}
        columns={columns}
        />
    ))}
  </tbody>
))


function SortableItems({ rows, columns, onSortEnd }) {
  return (
    <SortableListContainer
      rows={rows}
      columns={columns}
      shouldCancelStart={function(e) {
        // Prevent sort behaviour when clicking on the Action buttons
        if (e.target.classList.contains('las')) {
          return true;
        }
      }}
      onSortEnd={onSortEnd}
    />
  );
}

export default SortableItems;