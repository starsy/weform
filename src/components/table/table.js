import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import TableRow from '../table-row/table-row';
import TableRows from '../table-rows/table-rows';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table');

const { object } = PropTypes;

class Table extends Component {
  static propTypes = {
    table: object
  };

  static defaultProps = {
    table: null
  };

  constructor(props) {
    log.info("props: ", props);
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
          row: {cols: this.props.table.metadata.fields.map((f) => ({v: f.name}))}
        }
      },
      tableRows: {
        component: TableRows,
        props: {
          rows: this.props.table.data.rows.filter((row) => (row && row.cols && row.cols.length > 0))
        }
      }
    };
  }
}
export default Table;
