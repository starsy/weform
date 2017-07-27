import { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';
import loglevel from 'loglevel';

let log = loglevel.getLogger('form');

const { string, func } = PropTypes;

class FormItem extends Component {
  static propTypes = {
    id: string,
    title: string,
    url: string,
    onRemove: func,
  };

  constructor(props) {
    super(props);
  }
  
  handleRemove() {
    this.props.onRemove(this.props.id);
  }

  handleShowForm() {
    wx.navigateTo({ url: '/pages/form/' + this.props.id });
  }
  
}

const mapStateToProps = (state) => {
  log.info("in map state to props: ", state);
  return {
    login: state.login,
    table: state.form.table,
  };
};

const mapDispatchToProps = (dispatch) => {
  log.info("in map dispatch to props: ");
  return bindActionCreators({
    get: FormActions.get,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormItem);

