const express = require("express");

express.response.error = function (error) {
  if (!error.code) {
    error = {
      message: error.toString(),
      code: "server_error",
      status: 500,
    };
  }

  this.status(error.status).json(error);
};

module.exports = {
  invalidId: {
    message: "Invalid ID",
    code: "invalid_id",
    status: 400,
  },
  notUniqueValue: {
    message: "Not unique value",
    code: "not_unique",
    status: 400,
  },
  unauthorized: {
    message: "Token are wrong",
    code: "unauthorized",
    status: 401,
  },
  forbidden: {
    message: "Access denied",
    code: "Forbidden",
    status: 403,
  },
  accessDenied: {
    message: "Access denied",
    code: "access_denied",
    status: 403,
  },
  notFound: {
    message: "Entity not found",
    code: "entity_not_found",
    status: 404,
  },
  wrongCredentials: {
    message: "Email or password are wrong",
    code: "wrong_credentials",
    status: 404,
  },
  methodNotAllowed: {
    message: "Method Not Allowed",
    code: "method_not_allowed",
    status: 405,
  },
};
