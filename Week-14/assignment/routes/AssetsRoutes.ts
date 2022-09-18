import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import {
  assetDeleteValidationMiddleware,
  assetUpdateValidationMiddleware,
} from "../middleware/asset";
import { verifyToken } from "../middleware/token";
import UserModel from "../schema/User";
import { ASSETS } from "../utils/constants";

import { decodeToken } from "../utils/token";

const router = Router({
  caseSensitive: true,
});

router.get("/", [verifyToken], async (req: Request, res: Response) => {
  const userUUID = decodeToken(req.token);

  try {
    const userDoc = await UserModel.findOne({ uuid: userUUID });
    if (userDoc === null)
      return res.status(400).json({
        message: "invalid jwt token",
      });

    return res.status(200).json({
      assets: userDoc.assets,
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
});

router.post(
  "/update",
  [verifyToken, assetUpdateValidationMiddleware()],
  async (req: Request, res: Response) => {
    const expressVallidationErrors = validationResult(req);

    if (!expressVallidationErrors.isEmpty()) {
      return res.status(400).json({
        errors: expressVallidationErrors.array(),
      });
    }

    const userUUID = decodeToken(req.token);

    if (req.body.asset && req.body.quantity !== undefined) {
      const queryAsset = req.body.asset;
      const queryQuantity = req.body.quantity;

      let assetQuery: {
        [index: string]: number;
      } = {};

      assetQuery[`assets.${queryAsset}`] = queryQuantity;

      try {
        const userDoc = await UserModel.findOneAndUpdate(
          { uuid: userUUID },
          assetQuery,
          {
            new: true,
          }
        );

        if (userDoc === null)
          return res.status(400).json({
            message: "user not found",
          });

        return res.status(200).json({
          assets: userDoc.assets,
        });
      } catch (error) {
        if (error) {
          if (error) {
            console.error(error);
            return res.sendStatus(500);
          }
        }
      }
    }

    const assets: {
      name: string;
      quantity: number;
    }[] = req.body.assets;

    let assetQuery: {
      [index: string]: number;
    } = {};

    assets.forEach((asset) => {
      asset.name = asset.name.toLowerCase().trim();
      if (
        ASSETS.indexOf(asset.name) === -1 ||
        typeof asset.quantity !== "number"
      ) {
        return res.status(400).json({
          message:
            "body parameter assets should be a valid array of object having properties name and quantity",
        });
      }
      assetQuery[`assets.${asset.name}`] = asset.quantity;
    });

    try {
      const userDoc = await UserModel.findOneAndUpdate(
        { uuid: userUUID },
        assetQuery,
        {
          new: true,
        }
      );

      if (userDoc === null)
        return res.status(400).json({
          message: "user not found",
        });

      return res.status(200).json({
        assets: userDoc.assets,
      });
    } catch (error) {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }
    }
  }
);

router.post(
  "/delete",
  [verifyToken, assetDeleteValidationMiddleware()],
  async (req: Request, res: Response) => {
    const userUUID = decodeToken(req.token);

    if (req.body.asset) {
      const queryAsset: string = req.body.asset;

      let query: {
        [index: string]: number;
      } = {};

      query[`assets.${queryAsset}`] = 0;

      try {
        const userDoc = await UserModel.findOneAndUpdate(
          {
            uuid: userUUID,
          },
          query
        );

        if (userDoc === null)
          return res.status(400).json({
            message: "user not found",
          });

        return res.status(200).json({
          assets: userDoc.assets,
        });
      } catch (error) {
        if (error) {
          console.error(error);
          return res.sendStatus(500);
        }
      }
    }

    const queryAssets: string[] = req.body.assets;

    let query: {
      [index: string]: number;
    } = {};

    queryAssets.forEach((asset) => {
      asset = asset.toLowerCase().trim();
      query[`assets.${asset}`] = 0;
    });

    try {
      const userDoc = await UserModel.findOneAndUpdate(
        {
          uuid: userUUID,
        },
        query
      );

      if (userDoc === null)
        return res.status(400).json({
          message: "user not found",
        });

      return res.status(200).json({
        assets: userDoc.assets,
      });
    } catch (error) {
      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }
    }
  }
);

export default router;
