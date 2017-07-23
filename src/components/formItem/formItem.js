import { Component, PropTypes } from 'labrador-immutable';

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

export default FormItem;

