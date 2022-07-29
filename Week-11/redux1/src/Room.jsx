import { Component } from "react";
import { connect } from "react-redux";
import { switchLightAction } from "./actions";

class Room extends Component {
  render() {
    const lightedness = this.props.lightState ? "lit" : "dark";
    return (
      <div className={"room"}>
        <div className={lightedness}>
          <h1>the room is {lightedness}</h1>
          <button onClick={this.props.switchLigh}>flip</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    switchLigh() {
      dispatch(switchLightAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
