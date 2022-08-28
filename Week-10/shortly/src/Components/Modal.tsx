import { Dispatch, SetStateAction } from "react";
import { AlertStateType } from "./Alert";
import {
  APIResponseResult,
  copyLinkToClipboard,
  getLinkObjArr,
} from "../Utils/Helper";
import modalStyles from "../Styles/Modal.module.scss";
import { Fade, IconButton, Modal } from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopy";

const PopModal = (
  modalState: {
    visible: boolean;
    message: string;
    links: APIResponseResult | null;
  },
  setModalState: Dispatch<
    SetStateAction<{
      visible: boolean;
      message: string;
      links: APIResponseResult | null;
    }>
  >,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>
) => {
  const handleClose = () => {
    setModalState({
      visible: false,
      message: "",
      links: null,
    });
  };

  return (
    <Modal
      open={modalState.visible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={modalState.visible}>
        <div className={modalStyles.container}>
          <h4>
            Entered Link : {""}
            <a
              target={"_blank"}
              rel="noreferrer"
              href={modalState.links?.original_link}
            >
              {modalState.links?.original_link}
            </a>
          </h4>
          {modalState.links &&
            getLinkObjArr(modalState.links).map((shortLinkObj, index) => (
              <div className={modalStyles.linkListItemRow} key={index}>
                <h5>
                  Shortified Link {index + 1} :{" "}
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    href={shortLinkObj.fullShortLink}
                  >
                    {shortLinkObj.shortLink}
                  </a>
                </h5>
                <IconButton
                  type="submit"
                  className={modalStyles.btn}
                  onClick={() => {
                    copyLinkToClipboard(
                      shortLinkObj.fullShortLink,
                      setAlertState
                    );
                  }}
                >
                  <CopyIcon />
                </IconButton>
              </div>
            ))}
        </div>
      </Fade>
    </Modal>
  );
};

export default PopModal;
