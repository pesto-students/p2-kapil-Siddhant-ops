import { connect } from "react-redux";
import { addStepAction, resetStepAction } from "./action";

const StepCounter = (props) => {
  return (
    <main>
      <h1>You've walked {props.steps} steps today</h1>
      <button onClick={props.addSteps}>Add step</button>
      <button onClick={props.resetSteps}>Reset steps</button>
    </main>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => {
  return {
    addSteps() {
      dispatch(addStepAction());
    },
    resetSteps() {
      dispatch(resetStepAction());
    },
  };
};

const connectWrapper = connect(mapStateToProps, mapDispatchToProps);

export default connectWrapper(StepCounter);
