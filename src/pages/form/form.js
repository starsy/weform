import {Component, PropTypes} from 'labrador-immutable';
import immutable from 'seamless-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import Table from '../../components/table/table';
import loglevel from 'loglevel';

let log = loglevel.getLogger('form');

const {object} = PropTypes;

class Form extends Component {
  static propTypes = {
    table: object
  };

  static defaultProps = {
    table: {
      metadata: {
        title: "Test Form",
        fields: [
          {name: "F1"},
          {name: "F2"},
          {name: "F3"},
          {name: "F4"},
          {name: "F5"},
        ]
      },
      data: {
        rows: [
          {
            cols: [
              {v: "11", _id: 1},
              {v: "12", _id: 2},
              {v: "13", _id: 3},
              {v: "14", _id: 4},
              {v: "15", _id: 5},
            ]
          },
          {
            cols: [
              {v: "21", _id: 6},
              {v: "22", _id: 7},
              {v: "23", _id: 8},
              {v: "24", _id: 9},
              {v: "25", _id: 10},
            ]
          },
          {
            cols: [
              {v: "31", _id: 11},
              {v: "32", _id: 12},
              {v: "33", _id: 13},
              {v: "34", _id: 14},
              {v: "35", _id: 15},
            ]
          }
        ]
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = immutable({});
  }

  children() {
    return {
      table: {
        component: Table,
        props: {
          table: this.props.table
        }
      }
    };
  }

  onLoad(option) {
    let query = option.query;
  }

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

export default Form;

/*
export default connect(
  (state)=>({})
)(Form);
*/
