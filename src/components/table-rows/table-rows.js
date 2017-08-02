import { Component, PropTypes } from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import TableRow from '../table-row/table-row';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-rows');

const { object, array } = PropTypes;

class TableRows extends Component {
  static propTypes = {
    dimension: object,
    rows: array,
    callbacks: object,
  };

  static defaultProps = {
    rows: [],
    callbacks: {}
  };

  constructor(props) {
    log.info("constructor props: ", props);
    super(props);
    this.state = Immutable({rows: props.rows});
  }

  children() {
    let i = 0;
    log.info("this.state.rows", this.state.rows);
    return {
      rows: this.state.rows.map((row) => ({
        component: TableRow,
        key: i++,
        props: {
          header: false,
          odd: (i % 2 !== 0),
          width: this.props.dimension.width,
          newRow: row.newRow,
          cols: row.cols,
          callbacks: this.props.callbacks,
        }
      }))
    };
  }
  
  handleAddRow(event) {
    log.info("handleAddRow", event);
    let i = 0;
    let newState = this.state.set('rows', this.state.rows.concat([{newRow: true}]));
    this.setState(newState);
  }

}

export default TableRows;
