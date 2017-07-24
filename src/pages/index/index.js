import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import FormItem from '../../components/formItem/formItem';
import { sleep } from '../../utils/utils';
import * as LoginActions from '../../redux/login';
import * as FormActions from '../../redux/forms';
import loglevel from 'loglevel';

let log = loglevel.getLogger('index');

const { object, string, array, func } = PropTypes;

class Index extends Component {
  static propTypes = {
    userInfo: object,
    thirdSession: string,
    recentForms: array,
    ownerForms: array,
    createForm: func,
    removeForm: func,
    renameForm: func,
    login: func,
  };

  state = {
    titleInput: '',
    thirdSession: ''
  };

  children() {
    let recentForms = this.props.recentForms || [];
    let ownerForms = [];
    
    if (recentForms.length) {
    }
    return {
      recent: recentForms.map((form) => ({
        component: FormItem,
        key: form.id,
        props: {
          ...form,
          onEdit: this.handleEdit,
          onRemove: this.handleRemove
        } 
      })),
      owner: ownerForms.map((form) => ({
        component: Todo,
        key: form.id,
        props: {
          ...form,
          onEdit: this.handleEdit,
          onRemove: this.handleRemove
        }
      }))
    };
  }

  onUpdate(props) {
    log.info("props: ", props);
    let nextState = Object.assign({}, this.state, {thirdSession: props.thirdSession, userInfo: props.userInfo});
    log.info("next state: ", nextState);
    this.setState(nextState);
  }

  handleInput(e) {
    log.info("Handle Input Event: ", e);
    this.setState({ titleInput: e.detail.value });
  }

  async onPullDownRefresh() {
    await sleep(1000);
    wx.showToast({ title: '刷新成功' });
    wx.stopPullDownRefresh();
  }

  handleCreate() {
    let title = this.state.titleInput;
    if (!title) {
      wx.showToast({ title: '请输入任务' });
      return;
    }
    this.props.createForm({ title });
    this.setState({ titleInput: '' });
  }
  
  handleEdit = (id) => {
    wx.navigateTo({ url: '/pages/ui/index' });
  };

  handleShowUI() {
    wx.navigateTo({ url: '/pages/ui/index' });
  }
  
  async onLoad() {  
    log.info("onLoad");
    this.props.login();
  }
}

const mapStateToProps = (state) => {
  log.info("in map state to props: ", state);
  return {
    thirdSession: state.login.thirdSession,
    userInfo: state.login.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: LoginActions.login,
    createForm: FormActions.create,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);


