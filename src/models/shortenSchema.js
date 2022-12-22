import joi from "joi";

const shortenSchema = joi.object({
  url: joi.string().uri().required()
});

export default shortenSchema;