check-user-role, seu amiguinho
=========



## Installation

  `npm install check-user-role`

## Usage

  ```js
  import check-user-role from 'check-user-role'

  const check-user-roleMiddleware = check-user-role({
    webhookUrl: 'WEBHOOK_URL',
    shouldSendToSlack: (err) => err.statusCode === 500
  })

  //  At the end of your middleware chain
  app.use(check-user-roleMiddleware())
  ```

  You can pass additional config to check-user-role to make it even better
  ```
  String channel,
  String iconUrl,
  String username,
  Function getText,
  ```

  The function getText will receive this object on it's first param:
  ```
  {
    packageName,
    platform,
    env = 'development',
    ip,
    err,
  }
  ```

  So you can build your own custom message :)

## Tests

  `npm test`
