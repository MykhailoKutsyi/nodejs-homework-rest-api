const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContactById));

router.put(
  "/:id",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;
