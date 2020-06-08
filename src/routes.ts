import express from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

const upload = multer(multerConfig);

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

/*
  messages({
    'string.base': `"a" should be a type of 'text'`,
    'string.empty': `"a" cannot be an empty field`,
    'string.min': `"a" should have a minimum length of {#limit}`,
    'any.required': `"a" is a required field`
  })
*/

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().messages({
          "any.required": "O nome é obrigatório",
        }),
        email: Joi.string().email().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;
