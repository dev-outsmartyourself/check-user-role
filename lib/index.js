'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultErrorObject = new Error({
  statusCode: 403,
  message: 'Forbidden'
});

var defaultRoleGetter = function defaultRoleGetter(req) {
  return req.user && req.user.role;
};

exports.default = function (_ref) {
  var superUser = _ref.superUser,
      _ref$roleGetter = _ref.roleGetter,
      roleGetter = _ref$roleGetter === undefined ? defaultRoleGetter : _ref$roleGetter,
      _ref$errorObject = _ref.errorObject,
      errorObject = _ref$errorObject === undefined ? defaultErrorObject : _ref$errorObject;
  return function () {
    var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (req, res, next) {
      var userRole = void 0;

      if (roleGetter && typeof roleGetter === 'function') {
        userRole = roleGetter(req);
      }

      if (userRole && (userRole === superUser || roles.some(function (role) {
        return role === userRole;
      }))) {
        next();
        return;
      }

      next(errorObject);
    };
  };
};