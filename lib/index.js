'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var superUser = _ref.superUser,
      roleGetter = _ref.roleGetter,
      errorObject = _ref.errorObject;
  return function () {
    var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (req, res, next) {
      var userRole = void 0;

      if (roleGetter && typeof roleGetter === 'function') {
        userRole = roleGetter(req);
      } else {
        userRole = req.user && req.user.role;
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