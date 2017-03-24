export default ({ superUser, roleGetter, errorObject }) => (roles = []) => (req, res, next) => {
  let userRole

  if (roleGetter && typeof roleGetter === 'function') {
    userRole = roleGetter(req)
  } else {
    userRole = req.user && req.user.role
  }

  if (userRole && (userRole === superUser || roles.some(role => role === userRole))) {
    next()
    return
  }

  next(errorObject)
}
