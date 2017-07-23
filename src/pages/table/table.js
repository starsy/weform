import wx, { Component, PropTypes } from 'labrador-immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'labrador-redux';

const {array} = PropTypes;

class Table extends Component {
  static propTypes = {
    listData: array
  };

  static defaultProps = {
      listData: [
        { code: "01", text: "text1", type: "type1" },
        { code: "02", text: "text2", type: "type2" },
        { code: "03", text: "text3", type: "type3" },
        { code: "04", text: "text4", type: "type4" },
        { code: "05", text: "text5", type: "type5" },
        { code: "06", text: "text6", type: "type6" },
        { code: "07", text: "text7", type: "type7" },
        { code: "08", text: "text7", type: "type7" },
        { code: "09", text: "text7", type: "type7" },
        { code: "10", text: "text7", type: "type7" }
        ]
  };
  
  async onLoad() {
    console.log('onLoad Table')
  }
}

const mapStateToProps = (state) => {
  console.info("in map state to props: ", state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
