import { arrayMoveImmutable } from "array-move";
import uniqueRowIdentifier from "../../SortableTable/uniqueRowIdentifier";
const tableReducerFactory = (defaultColumns = [], defaultRows = []) => {
  //
  // Check whether any ordering has been stored in localstorage.
  // If found, sort all matching elements accordingly, and place any new elements at the end.
  //

  let rowOrder = JSON.parse(localStorage.getItem('tablestore:row-order') || 'null');
  let columnOrder = JSON.parse(localStorage.getItem('tablestore:column-order') || 'null');

  if(rowOrder) {
    let orderedRows = new Array(defaultRows.length);
    for(let i = 0; i < defaultRows.length; i++) {
      let row = defaultRows[i];
      let index = rowOrder.indexOf(uniqueRowIdentifier(row));
      if(index > -1) {
        orderedRows[index] = (defaultRows.splice(i--, 1)[0]);
        delete rowOrder[index];
      }
    }
    defaultRows = [orderedRows, defaultRows].flat();
  }

  if(columnOrder) {
    let orderedColumns = new Array(defaultColumns.length);
    for(let i = 0; i < defaultColumns.length; i++) {
      let column = defaultColumns[i];
      let index = columnOrder.indexOf(column.field);
      if(index > -1) {
        orderedColumns[index] = (defaultColumns.splice(i--, 1)[0]);
        delete columnOrder[index];
      }
    }
    defaultColumns = [orderedColumns, defaultColumns].flat();
  }

  const initialState = {
    columns: defaultColumns,
    rows: defaultRows
  }

  return (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
      case 'columns/sort':
        return {
          ...state,
          columns: arrayMoveImmutable(state.columns, action.oldIndex, action.newIndex)
        }
      case 'rows/sort':
        newState.rows = arrayMoveImmutable(state.rows, action.oldIndex, action.newIndex);
        return newState;
      default:
        return state
    }
  }
};

export default tableReducerFactory;