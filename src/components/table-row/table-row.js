import wx, { Component, PropTypes } from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-row');
const { string, array, bool, object, func } = PropTypes;

class TableRow extends Component {
  static propTypes = {
    header: bool,
    odd: bool,
    newRow: bool,
    cols: array,
    editing: bool,
    cancelling: bool,
    callbacks: object,
  };

  static defaultProps = {
    header: false,
    odd: false,
    newRow: true,
    cols: array,
    editing: false,
    cancelling: false,
    callbacks: {}
  };

  constructor(props) {
    log.info("constructor props: ", props);
    super(props);
    
    if (!props.newRow) {
      this.state = Immutable({cols: props.cols});  
    } else {
      this.state = Immutable({
        cols: Array(props.width).fill({v: ''}),
        editing: true,
        cancelling: false,
        actionButtonColor: "green",
        actionButtonType: "check-circle"
      });
    }
    
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

    log.info("handleEditDone: (this)", this);
    
    if (this.state.newRow) {
      this.props.callbacks.createRow(this.state.cols);
    }
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
        cols: this.props.cols,
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

export default TableRow;
