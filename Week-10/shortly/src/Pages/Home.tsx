import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { AlertStateType } from "../Components/Alert";
import Navbar from "../Components/Navbar";
import {
  APIResponseResult,
  copyLinkToClipboard,
  getLinkObjArr,
  getLocalStorage,
  submitURL,
} from "../Utils/Helper";
import homeStyles from "../Styles/Home.module.scss";
import { Button, IconButton } from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopy";

interface HomeProps {
  setAlertState: Dispatch<SetStateAction<AlertStateType>>;
  setModalState: Dispatch<
    SetStateAction<{
      visible: boolean;
      message: string;
      links: APIResponseResult | null;
    }>
  >;
}

const Home = ({ setAlertState, setModalState }: HomeProps) => {
  const [inputURL, setInputURL] = useState("");

  const [linksState, setLinksState] = useState<APIResponseResult[]>(
    getLocalStorage()
  );

  return (
    <Fragment>
      <Navbar />
      <main>
        <section className={homeStyles.sectionOne}>
          <div className={homeStyles.content}>
            <h1>
              Creating <br />
              World Class <br />
              Short Links
            </h1>
            <h4>Keep it short and sweet.</h4>
          </div>
          <div className={homeStyles.content}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitURL(
                  inputURL,
                  setInputURL,
                  setAlertState,
                  setModalState,
                  setLinksState
                );
              }}
              className={homeStyles.inputWrapper}
            >
              <input
                type="url"
                value={inputURL}
                onChange={(e) => {
                  setInputURL(e.target.value);
                }}
                placeholder="Enter any url"
              />
              <Button
                type="submit"
                className={homeStyles.btn}
                variant="outlined"
              >
                Shorten
              </Button>
            </form>
            {linksState.length > 0 && (
              <div className={homeStyles.linkListContainer}>
                {linksState.map((linkState, index) => (
                  <div className={homeStyles.linkListItem} key={index}>
                    <details>
                      <summary>
                        <h4>
                          Entered Link : {""}
                          <a
                            target={"_blank"}
                            rel="noreferrer"
                            href={linkState.original_link}
                          >
                            {linkState.original_link}
                          </a>
                        </h4>
                      </summary>
                      {getLinkObjArr(linkState).map((shortLinkObj, index) => (
                        <div className={homeStyles.linkListItemRow} key={index}>
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
                            className={homeStyles.btn}
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
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Home;
