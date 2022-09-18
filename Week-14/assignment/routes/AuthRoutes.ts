import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import {
  authLoginValidationMiddleware,
  authSignupValidationMiddleware,
} from "../middleware/auth";
import UserModel from "../schema/User";
import { secret } from "../utils/constants";

const router = Router({
  caseSensitive: true,
});

router.post(
  "/signup",
  authSignupValidationMiddleware(),
  async (req: Request, res: Response) => {
    const expressValidatorErrors = validationResult(req);

    if (!expressValidatorErrors.isEmpty()) {
      return res.status(400).json({
        error: expressValidatorErrors.array(),
      });
    }

    try {
      const newUser = new UserModel(req.body);

      const salt = await genSalt(10);

      const hashPassword = await hash(newUser.password, salt);

      newUser.password = hashPassword;

      const tempUUID = Buffer.from(
        newUser.username + "__" + newUser.email,
        "base64"
      ).join("");

      newUser.uuid = tempUUID;

      const docRes = await newUser.save();

      const payload = {
        uuid: docRes.uuid,
      };

      sign(
        payload,
        secret,
        {
          expiresIn: "7d",
        },
        (signErr, token) => {
          if (signErr) throw signErr;

          return res.status(201).json({
            token,
          });
        }
      );
    } catch (error) {
      if (error) {
        console.error(error);
        return res.status(400).json({
          error,
        });
      }
    }
  }
);

router.post(
  "/login",
  authLoginValidationMiddleware(),
  async (req: Request, res: Response) => {
    const expressValidatorErrors = validationResult(body);

    if (!expressValidatorErrors.isEmpty()) {
      return res.status(400).json({
        error: expressValidatorErrors.array(),
      });
    }

    const inputEmail = req.body.email;

    try {
      const userDoc = await UserModel.findOne({ email: inputEmail });

      if (userDoc === null)
        return res.status(400).json({
          message: "User not found",
        });

      const passwordIsSame = await compare(req.body.password, userDoc.password);

      if (!passwordIsSame)
        return res.status(400).json({
          message: "Invalid credentials",
        });

      const payload = {
        uuid: userDoc.uuid,
      };

      sign(
        payload,
        secret,
        {
          expiresIn: "7d",
        },
        (signErr, token) => {
          if (signErr) throw signErr;

          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      if (error) {
        console.error(error);
        return res.status(400).json({
          error,
        });
      }
    }
  }
);

export default router;
