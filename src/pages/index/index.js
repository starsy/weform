import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import Todo from '../../components/todo/todo';
import * as todoActions from '../../redux/todos';
import { sleep } from '../../utils/utils';

const { array, func } = PropTypes;

class Index extends Component {
  static propTypes = {
    recentForms: array,
    ownerForms: array,
    createForm: func,
    removeForm: func,
    renameForm: func
  };

  state = {
    titleInput: '',
    userInfo: {}
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
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        } 
      })),
      owner: ownerForms.map((todo) => ({
        component: Todo,
        key: todo.id,
        props: {
          ...todo,
          onRemove: this.handleRemove,
          onRestore: this.handleRestore,
          onFinish: this.handleFinish
        }
      }))
    };
  }

  onUpdate(props) {
    let nextState = {
      finished: 0
    };
    props.todos.forEach((todo) => {
      if (todo.finished) {
        nextState.finished += 1;
      }
    });
    this.setState(nextState);
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
    this.props.createTodo({ title });
    this.setState({ titleInput: '' });
  }

  handleInput(e) {
    this.setState({ titleInput: e.detail.value });
  }

  handleRemove = (id) => {
    this.props.removeTodo(id);
  };

  handleFinish = (id) => {
    this.props.finishTodo(id);
  };

  handleRestore = (id) => {
    this.props.restoreTodo(id);
  };

  handleShowFinished() {
    wx.navigateTo({ url: 'finished' });
  }

  handleShowUI() {
    wx.navigateTo({ url: '/pages/ui/index' });
  }
  
  async onLoad() {  
    console.info("onLoad");       
               
    wx.wx.checkSession({
      success: await this.check3rdSession(),
      fail: await this.login3rdSession(),
    });

    let that = this;
    let userInfo = wx.app.getUserInfo((userInfo) => {
        that.setData({
          userInfo: userInfo
        });
      }
    );
  }

  async get3rdSession() {
    console.info("Get 3rd session from local");
    try {
      return await wx.getStorage({key: '3rd_session'});
    } catch (e) {
      console.error("error when getting 3rd session from storage", e);
    }
  }

  async check3rdSession() {
    console.info("Check 3rd session");
    let value = await this.get3rdSession();
    console.info("3rd_session", value);
    
    if (value.data) {
      value = value.data;
    } else {
      value = null;
    }
    
    if (!value) {
      await this.login3rdSession();
    } else {
      let res = await wx.request({
        url: 'http://localhost/check_3rd_session?s=' + value,
        method: "GET"
      });

      console.log("status: ", res);

      if (res) {
        if (!res.data.valid) {
          console.info("3rd session is NOT valid");
          await this.login3rdSession();
        } else {
          console.info("3rd session is valid");
        }
        return res.data.valid;
      }
    }
  };

  async get3rdSessionFromServer(userInfo, code) {
    console.info("Get 3rd session from server");
    console.log("userInfo: ", userInfo, "code: ", code);
    
    let res = await wx.request({
      method: "POST",
      url: "http://localhost/login?code=" + code,
      data: userInfo
    });
    
    if (res) {
      console.log("Success Login Server Response: ", res.data);
      try {
        await wx.setStorage({key: '3rd_session', data: res.data.third_session});
      } catch (e) {
        console.error("Error when writing 3rd_session into storage", e);
      }
    }
  }

  async login3rdSession() {
    console.info("Login 3rd session");

    let res = null, login_code = null;
    try {
      res = await wx.login();
      if (res) {
        login_code = res.code;
      }
    } catch (e) {
      log.error("Error when login", e);
      return;
    }
    
    if (login_code) {
      try {
        res = await wx.getUserInfo();
      } catch (e) {
        log.error("Error when getUserInfo", e);
      }
      console.info("res: ", res);
      if (!res) {
        return;  
      }

      try {
        await this.get3rdSessionFromServer(res.userInfo, login_code);
      } catch (e) {
        log.error("Error when get 3rd session from server", e);
      }
    }
  };


}

export default connect(
  ({ todos }) => ({ todos }),
  (dispatch) => bindActionCreators({
    createTodo: todoActions.create,
    removeTodo: todoActions.remove,
    finishTodo: todoActions.finish,
    restoreTodo: todoActions.restore,
  }, dispatch)
)(Index);


