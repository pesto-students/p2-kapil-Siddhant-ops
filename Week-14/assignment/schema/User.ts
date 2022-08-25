import { model, Schema as mongooseSchema } from "mongoose";

const UserSchema = new mongooseSchema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    assets: {
      required: true,
      default: {
        equity: 0,
        fixedincome: 0,
        alternatives: 0,
      },
      type: {
        equity: {
          type: Number,
          required: true,
        },
        fixedincome: {
          type: Number,
          required: true,
        },
        alternatives: {
          type: Number,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("UserSchema", UserSchema, "users");

export default UserModel;
