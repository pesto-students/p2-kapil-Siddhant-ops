import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { AlertStateType } from "../Components/Alert";
import Navbar from "../Components/Navbar";
import { submitContactForm } from "../Utils/Helper";
import contactStyles from "../Styles/Contact.module.scss";
import { NorthEast } from "@mui/icons-material";
import { Button, TextareaAutosize, TextField } from "@mui/material";

const Contact = ({
  setAlertState,
}: {
  setAlertState: Dispatch<SetStateAction<AlertStateType>>;
}) => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <Fragment>
      <Navbar />
      <main className={contactStyles.main}>
        Love to hear from you,
        <br />
        <h1>Get in touch👋</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitContactForm(
              contactFormData,
              setContactFormData,
              setAlertState
            );
          }}
        >
          <div>
            <label htmlFor="name">Your name</label>
            <TextField
              required
              fullWidth
              type="text"
              id="name"
              className={contactStyles.input}
              value={contactFormData.name}
              onChange={(e) => {
                setContactFormData((prevContactFormData) => {
                  return { ...prevContactFormData, name: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Your email</label>
            <TextField
              required
              fullWidth
              type="email"
              typeof="email"
              id="email"
              className={contactStyles.input}
              value={contactFormData.email}
              onChange={(e) => {
                setContactFormData((prevContactFormData) => {
                  return { ...prevContactFormData, email: e.target.value };
                });
              }}
            />
          </div>
          <div className={contactStyles.textAreaContainer}>
            <label htmlFor="message">Message</label>
            <TextareaAutosize
              required
              id="message"
              className={contactStyles.textArea}
              minRows={5}
              maxRows={10}
              value={contactFormData.message}
              onChange={(e) => {
                setContactFormData((prevContactFormData) => {
                  return { ...prevContactFormData, message: e.target.value };
                });
              }}
            />
          </div>
          <Button
            fullWidth
            className={contactStyles.submitBtn}
            endIcon={<NorthEast />}
            type="submit"
          >
            Just Send
          </Button>
        </form>
      </main>
    </Fragment>
  );
};

export default Contact;
