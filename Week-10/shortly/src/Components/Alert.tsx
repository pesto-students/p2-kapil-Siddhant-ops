import { Dispatch, SetStateAction } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface AlertStateType {
  visible: boolean;
  severity: AlertColor;
  message: string;
}

const PopAlert = (
  alertState: AlertStateType,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>
) => {
  function closeSnackBar() {
    setAlertState({
      visible: false,
      severity: "info",
      message: "",
    });
  }

  return (
    <Snackbar
      open={alertState.visible}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={5000}
      onClose={closeSnackBar}
    >
      <Alert onClose={closeSnackBar} severity={alertState.severity}>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};

export default PopAlert;
export type { AlertStateType };
