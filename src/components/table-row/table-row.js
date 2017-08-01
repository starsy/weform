import wx, { Component, PropTypes } from 'labrador-immutable';
import Immutable from 'seamless-immutable';
import loglevel from 'loglevel';

let log = loglevel.getLogger('table-row');
const { string, bool, object, func } = PropTypes;

class TableRow extends Component {
  static propTypes = {
    isHeader: bool,
    row: object,
    editing: bool,
    cancelling: bool,
  };

  static defaultProps = {
    isHeader: false,
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

  children() {
    return {};
  }
  
  doNothing(event) {}
  
  handleLongTap(event) {
    log.info("handleLongTap", event);
    this.setState({...this.state, editing: true, actionButtonColor: "green", actionButtonType: "check-circle"});
  }

  handleEditDone(event) {
    log.info("handleEditDone", event);
    
    if (this.state.cancelling) {
      return;
    }
    
    this.setState({...this.state, editing: false});
  }

  async handleEditCancel(event) {
    log.info("handleEditCancel", event);
    
    this.setState({...this.state, editing: true, cancelling: true, actionButtonColor: "red", actionButtonType: "question"});

    let res = await wx.showModal({
      title: '提示',
      content: '确定要取消吗？'
    });

    if (res.confirm) {
      this.setState({...this.state, editing: false, cancelling: false});
      console.log('用户点击确定')
    } else {
      this.setState({...this.state, editing: true, cancelling: false, actionButtonColor: "green", actionButtonType: "check-circle"});
      console.log('用户点击取消')
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
