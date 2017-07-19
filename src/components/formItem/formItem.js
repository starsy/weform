import { Component, PropTypes } from 'labrador-immutable';

const { string, func } = PropTypes;

class FormItem extends Component {
  static propTypes = {
    id: string,
    title: string,
    url: string,
    onRemove: func,
    onRename: func,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  onUpdate(props) {
    this.setState({
      title: props.title,
    });
  }

  handleRemove() {
    this.props.onRemove(this.props.id);
  }

  handleRename() {
    this.props.onRename(this.props.id);
  }
}

export default FormItem;

