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
              {v: "11"},
              {v: "12"},
              {v: "13"},
              {v: "14"},
              {v: "15"},
            ]
          },
          {
            cols: [
              {v: "21"},
              {v: "22"},
              {v: "23"},
              {v: "24"},
              {v: "25"},
            ]
          },
          {
            cols: [
              {v: "31"},
              {v: "32"},
              {v: "33"},
              {v: "34"},
              {v: "35"},
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
