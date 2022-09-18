import { body, oneOf } from "express-validator";
import { ASSETS } from "../utils/constants";

const assetUpdateValidationMiddleware = () => {
  return oneOf(
    [
      [
        body(
          "asset",
          "asset value should be valid - equity, fixedincome, alternatives"
        )
          .toLowerCase()
          .trim()
          .isIn(ASSETS),
        body("quantity", "quantity value should be valid number")
          .isNumeric()
          .toInt(),
      ],
      body(
        "assets",
        "body parameter assets should be a valid array of object having properties name and quantity of entities"
      ).isArray({
        min: 1,
      }),
    ],
    "body parameter assets or asset ( with quantity ) should be passed"
  );
};

const assetDeleteValidationMiddleware = () => {
  return oneOf(
    [
      body(
        "asset",
        "asset value should be valid - equity, fixedincome, alternatives"
      )
        .toLowerCase()
        .trim()
        .isIn(ASSETS),
      body(
        "assets",
        "body parameter assets should be a valid array of either of values - equity, fixedincome or alternatives"
      )
        .isArray({
          min: 1,
        })
        .custom((value) => {
          value.forEach((asset: any) => {
            asset = asset.toLowerCase().trim();
            if (typeof asset !== "string" || ASSETS.indexOf(asset) === -1) {
              return Promise.reject(
                "body parameter assets should be a valid array of either of values - equity, fixedincome or alternatives"
              );
            }
          });
        }),
    ],
    "body parameter assets or asset should be passed"
  );
};

export { assetUpdateValidationMiddleware, assetDeleteValidationMiddleware };
