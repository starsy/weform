import wx, { Component, PropTypes } from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-header-row');
const { string, bool, object, func } = PropTypes;

class TableHeaderRow extends Component {
  static propTypes = {
    row: object,
    editing: bool,
    cancelling: bool,
  };

  static defaultProps = {
    row: null,
    editing: false,
    cancelling: false,
  };

  constructor(props) {
    log.info("props: ", props);
    super(props);
    this.state = Immutable({cols: props.row.cols});
    log.info("constructor state:", this.state);
  }

  handleEdit(event) {
    log.info("handleEdit", event);
    this.setState(this.state.merge({
      editing: true, 
      actionButtonColor: "green", 
      actionButtonType: "check-circle"
    }));
  }

  handleEditDone(event) {
    log.info("handleEditDone", event);
    if (this.state.cancelling) {
      return;
    }
    this.setState(this.state.merge({editing: false}));
    this.props = this.props.setIn(['row', 'cols'], this.state.cols);
    log.info("handleEditDone: (props)", this.props);
    
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    });
  }

  async handleEditCancel(event) {
    log.info("handleEditCancel", event);
    this.setState(this.state.merge({
      editing: true,
      cancelling: true,
      actionButtonColor: "red",
      actionButtonType: "question"
    }));

    let res = await wx.showModal({
      title: '提示',
      content: '确定要取消吗？'
    });

    if (res.confirm) {
      this.setState(this.state.merge({
        cols: this.props.row.cols,
        editing: false,
        cancelling: false
      }));
      console.log('用户点击确定');
    } else {
      this.setState(this.state.merge({
        editing: true,
        cancelling: false,
        actionButtonColor: "green",
        actionButtonType: "check-circle"
      }));
      console.log('用户点击取消');
    }
  }
  
  handleInput(event) {
    log.info("handleInput:", event);
    let index = event.target.dataset.index;
    let newState = this.state.setIn(['cols', index, 'v'], event.detail.value);
    
    log.info("old state:", this.state);
    log.info("new state:", newState);
    
    this.setState(newState);
  }
  
  onLoad() {
    log.info("onLoad", this.props);
  }

  onUpdate(props) {
    log.info("onUpdate", props);
    log.info("onUpdate state", this.state);
  }
}

export default TableHeaderRow;
