import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
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
    row: null,
    editing: false,
  };

  constructor(props) {
    log.info("props: ", props);
    super(props);
    this.state = immutable({});
  }

  children() {
    return {};
  }
  
  handleLongTap(event) {
    log.info("handleLongTap", event);
    this.setState({...this.state, editing: true});
  }

  onUpdate(props) {
    log.info("onUpdate", props);
    log.info("onUpdate state", this.state);
  }
}

export default TableRow;
