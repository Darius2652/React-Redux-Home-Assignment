import React from 'react';
import SortableTable from './components/SortableTable';
import './App.css';
import { connect } from 'react-redux';

function App({ store }) {
  return (
    <div className="root">
      <div className="table-container">
        <div className="table-wrapper">
          <SortableTable
            store={store}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { columns: state.columns, rows: state.rows };
};

export default connect(mapStateToProps)(App);
