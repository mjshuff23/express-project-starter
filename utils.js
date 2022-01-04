const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const handleValidationErrors = (req, _res, next) => {
  /*
     Extracts the validation errors from a request and makes them available in a Result object.
     Each error returned by .array() and .mapped() methods has the following format by default:
        {
          "msg": "The error message",
          "param": "param.name.with.index[0]",
          "value": "param value",
          // Location of the param that generated this error.
          // It's either body, query, params, cookies or headers.
          "location": "body",

          // nestedErrors only exist when using the oneOf function
          "nestedErrors": [{ ... }]
        }
  */
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // .array() - Gets all validation errors contained in this result object and returns an array of errors. If the option onlyFirstError is set to true, then only the first error for each field will be included.
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.status = 400;
    err.title = 'Bad request.';
    err.errors = errors;
    return next(err);
  }
  next();
};

module.exports = { asyncHandler, handleValidationErrors };
