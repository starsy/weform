import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
import { connect } from 'labrador-redux';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-row');
const { bool, object } = PropTypes;

class TableRow extends Component {
  static propTypes = {
    isHeader: bool,
    row: object
  };

  static defaultProps = {
    isHeader: false,
    row: null
  };

  constructor(props) {
    log.info("props: ", props);
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
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

export default TableRow;

// export default connect(
//   (state)=>({})
// )(TableRow);
