import joi from "joi";

const shortenSchema = joi.object({
  url: joi.string().min(1).required()
});

export default shortenSchema;