import { Component, PropTypes } from 'labrador-immutable';
import immutable from 'seamless-immutable';
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
    let i = 0;
    return {
      rows: this.props.rows.map((row) => ({
        component: TableRow,
        key: i++,
        props: {
          header: false,
          odd: (i % 2 !== 0),
          empty: false,
          row: row,
        }
      }))
    };
  }
  
  handleAddRow(event) {
    log.info("handleAddRow", event);
  }

}

export default TableRows;
