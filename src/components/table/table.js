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
    if (!this.props.table) {
      return {};
    }
    
    return {
      tableHeader: {
        component: TableRow,
        props: {
          isHeader: true,
          row: {cols: this.props.table.metadata.fields.map((f) => ({v: f.name}))}
        }
      },
      tableRows: {
        component: TableRows,
        props: {
          rows: this.props.table.data.rows
        }
      }
    };
  }

  // onLoad() {
  // }

  // onReady() {
  // }

  // onUpdate() {
  // }

  // onShow() {
  // }

  // onHide() {
  // }

  // onUnload() {
  // }

}

/*
const mapStateToProps = (state) => {
  log.info("in map state to props: ", state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
*/

export default Table;
