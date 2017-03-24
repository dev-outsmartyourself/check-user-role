check-user-role
=========



## Installation

  `npm install check-user-role`

## Usage

  ```js
  import CheckUserRole from 'check-user-role'

  const checkUserRole = CheckUserRole({
    superUser: 'admin',
    errorObject: new Error('Unauthorized'),
    roleGetter: (req) => req.myAuthenticatedUser && req.myAuthenticatedUser.role,
  })
  ```

  If no roleGetter is provided, will use default req.user.role
  If no errorObject is provided, will use the default
  ```js
  Error(403)
  ```

  ```js
  const lumberjackOrFarmerChecker = checkUserRole(['lumberjack', 'farmer'])

  router.get('/enter-the-farm',
    app.auth.authenticate(),
    lumberjackOrFarmerChecker,
    (req, res) => {
      // Do whatever farmers and lumberjacks do at a farm
    }
  ```

  ```js
  const lumberjackChecker = checkUserRole(['lumberjack'])
  router.get('/chop-trees',
    app.auth.authenticate(),
    lumberjackChecker,
    (req, res) => {
      // Chop some trees
    }
  ```

  ```js
  const farmerChecker = checkUserRole(['farmer'])
  router.get('/farm',
    app.auth.authenticate(),
    farmerChecker,
    (req, res) => {
      // Farms
    }
  ```

## Tests

  `npm test`
