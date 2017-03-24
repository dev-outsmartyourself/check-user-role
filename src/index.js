const defaultErrorObject = new Error(403)

const defaultRoleGetter = req => req.user && req.user.role

export default ({
  superUser,
  roleGetter = defaultRoleGetter,
  errorObject = defaultErrorObject
}) => (roles = []) => (req, res, next) => {
  let userRole

  if (roleGetter && typeof roleGetter === 'function') {
    userRole = roleGetter(req)
  }

  if (userRole && (userRole === superUser || roles.some(role => role === userRole))) {
    next()
    return
  }

  next(errorObject)
}
