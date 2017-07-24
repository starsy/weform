import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import TableRow from '../table-row/table-row';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-rows');

const { array } = PropTypes;

class TableRows extends Component {
  static propTypes = {
    rows: array
  };

  static defaultProps = {
    rows: []
  };

  constructor(props) {
    log.info("props: ", props);
    super(props);
    this.state = immutable({});
  }

  children() {
    return {
      rows: this.props.rows.map((row) => {
        return {
          component: TableRow,
          props: {
            isHeader: false,
            row: row
          }
        }
      })
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

export default TableRows;

// export default connect(
//   (state)=>({})
// )(TableRows);
