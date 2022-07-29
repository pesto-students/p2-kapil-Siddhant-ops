import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import PopAlert, { AlertStateType } from "./Components/Alert";
import PopModal from "./Components/Modal";
import { APIResponseResult } from "./Utils/Helper";

function App() {
  const [alertState, setAlertState] = useState<AlertStateType>({
    visible: false,
    severity: "info",
    message: "",
  });

  const [modalState, setModalState] = useState<{
    visible: boolean;
    message: string;
    links: APIResponseResult | null;
  }>({
    visible: false,
    message: "",
    links: null,
  });

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Home setAlertState={setAlertState} setModalState={setModalState} />
          }
        />
        <Route
          path="/contact"
          element={<Contact setAlertState={setAlertState} />}
        />
      </Routes>
      {PopModal(modalState, setModalState, setAlertState)}
      {PopAlert(alertState, setAlertState)}
    </Fragment>
  );
}

export default App;
