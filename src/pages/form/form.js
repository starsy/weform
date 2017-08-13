import wx, {Component, PropTypes} from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import * as FormActions from '../../redux/form';
import Table from '../../components/table/table';

import loglevel from 'loglevel';

let log = loglevel.getLogger('form');

const {object, func} = PropTypes;

class Form extends Component {
  static propTypes = {
    login: object,
    table: object,
    loadForm: func,
    createForm: func,
  };
  
  /*
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
        ],
        dimension: {
          height: 3,
          width: 5,
        }
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
      */

  constructor(props) {
    super(props);
    this.state = Immutable({});
  }

  children() {
    //let self = this;
    return {
      table: {
        component: Table,
        props: {
          table: this.props.table,
          // bind "this" to createRow
          //createRow: this.createRow.bind(this),
          //createRow: function(row) { log.error("page/createRow"); self.createRow(row) },
          createRow: this.createRow,
        }
      }
    };
  }

  onLoad(option) {
    let id = option.id;
    log.info("option:", option);
    log.info("id:", id);
    
    if (!id) {
      return;
    }

    this.props.loadForm({id, session: this.props.login.thirdSession});
  }

  onUpdate(props) {
    
  }

  createRow(row) {
    log.error("in page/form createRow", row);
    log.error("in page/form createRow, this", this);
    // figure out myself
    let self = wx.currentPages[wx.currentPages.length - 1].data;
    self.props.createRow({
      form_id: self.props.table._id,
      row,
      session: self.props.login.thirdSession
    });
  }
  
  updateRow() {
    
  }
  
  deleteRow() {
    
  }
  
  createColumn() {
    
  }
  
  removeColumn() {
    
  }
  
  renameColumn() {
    
  }
  
  refreshTable() {
    
  }

}

const mapStateToProps = (state) => {
  let props = {
    login: state.login,
    table: state.form.table,
  };

  log.info("in map state to props: state: ", state, "props: ", props);
  
  return props;
};

const mapDispatchToProps = (dispatch) => {
  log.info("in map dispatch to props: ");
  return bindActionCreators({
    loadForm: FormActions.load,
    createRow: FormActions.createRow,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
