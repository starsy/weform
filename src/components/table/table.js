import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import TableRow from '../table-row/table-row';
import TableRows from '../table-rows/table-rows';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table');

const { object, func } = PropTypes;

class Table extends Component {
  static propTypes = {
    table: object,
    createRow: func,
    updateRow: func,
    deleteRow: func,
    createColumn: func,
    removeColumn: func,
    renameColumn: func,
    refreshTable: func,
  };

  static defaultProps = {
  };

  constructor(props) {
    log.info("constructor props: ", props);
    super(props);
    this.state = immutable({});
  }

  children() {
    if (!this.props.table || !this.props.table.metadata || !this.props.table.metadata.fields) {
      return {};
    }
    
    if (!this.props.table.data || !this.props.table.data.rows) {
      return {};
    }
    
    return {
      tableHeader: {
        component: TableRow,
        props: {
          header: true,
          cols: this.props.table.metadata.fields.map((f) => ({v: f.name}))
        }
      },
      tableRows: {
        component: TableRows,
        props: {
          dimension: this.props.table.metadata.dimension,
          rows: this.props.table.data.rows.filter((row) => (row && row.cols && row.cols.length > 0)),
          callbacks: {
            createRow: this.props.createRow,
            updateRow: this.props.updateRow,
            deleteRow: this.props.deleteRow,
          }
        }
      }
    };
  }
}
export default Table;
