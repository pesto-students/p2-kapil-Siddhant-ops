import { connect } from "mongoose";

const dbConnect = () => {
  const mongoURI = process.env.LOCAL_DB_URI ?? "";
  connect(mongoURI, (err) => {
    if (err) console.error("Mongo Connection error : ", err.message);
  });
};

export { dbConnect };
