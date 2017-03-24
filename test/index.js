'use strict';

import chai, { expect, assert } from 'chai'
import CheckUserRole from '../src/index'

const checkUserRole = CheckUserRole({
  superUser: 'admin',
  errorObject: new Error('Unauthorized')
})

const checkUserRoleWithCustomRoleGetter = CheckUserRole({
  superUser: 'admin',
  roleGetter: (req) => req.myAuthenticatedUser && req.myAuthenticatedUser.role,
  errorObject: new Error('Unauthorized')
})

const checkUserRoleWithDefaultErrorObject = CheckUserRole({
  superUser: 'admin',
})

describe('Check User Role tests', () => {
  it('Should dispatch error', done => {
    const req = {
      user: {
        role: 'manager'
      }
    }

    const checkIsAdmin = checkUserRole(['admin'])

    checkIsAdmin(req, null, (err) => {
      assert(err instanceof Error)
      done()
    })
  })

  it('Should NOT dispatch error', done => {
    const req = {
      user: {
        role: 'admin'
      }
    }

    const checkIsAdmin = checkUserRole(['admin'])

    checkIsAdmin(req, null, (err) => {
      assert.isUndefined(err)
      done()
    })
  })

  it('Should NOT dispatch error with 2 authorized roles', done => {
    const req = {
      user: {
        role: 'lumberjack'
      }
    }

    const checkIsAdmin = checkUserRole(['admin', 'lumberjack'])

    checkIsAdmin(req, null, (err) => {
      assert.isUndefined(err)
      done()
    })
  })

  it('Should NOT dispatch error with implicit admin', done => {
    const req = {
      user: {
        role: 'admin'
      }
    }

    const checkIsAdmin = checkUserRole(['lumberjack'])

    checkIsAdmin(req, null, (err) => {
      assert.isUndefined(err)
      done()
    })
  })

  it('Should NOT dispatch error with custom roleGetter', done => {
    const req = {
      myAuthenticatedUser: {
        role: 'admin'
      }
    }

    const checkIsAdmin = checkUserRoleWithCustomRoleGetter(['lumberjack'])

    checkIsAdmin(req, null, (err) => {
      assert.isUndefined(err)
      done()
    })
  })


  it('Should dispatch error with default errorObject', done => {
    const req = {
      user: {
        role: 'farmer'
      }
    }

    const checkIsLumberjack = checkUserRoleWithDefaultErrorObject(['lumberjack'])

    checkIsLumberjack(req, null, (err) => {
      assert(err instanceof Error, 'error must be instance of Error')
      assert(Number(err.message) === 403, 'error message should be 403')
      done()
    })
  })
})
