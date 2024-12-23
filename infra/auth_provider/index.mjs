/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import AWS from 'aws-sdk'
import AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

async function getUser(username) {
  const params = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    Username: username
  }

  return new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.adminGetUser(params, function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

async function getUserAllPol(token) {
  const params = {
    AccessToken: token
  }

  return new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.getUser(params, function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

async function getLogin(params) {
  const { userName, password, application } = params

  const authenticationData = {
    Username: userName,
    Password: password
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  const poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.COGNITO_POOL_WEB_ID
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: userName,
    Pool: userPool
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return new Promise((resolve, reject) => {
    // cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH')

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        resolve({ result })
      },
      onFailure: function (err) {
        resolve({ error: err })
      },
      mfaRequired: (codeDeliveryDetails) => {
        resolve(
          {
            error: {
              message: 'A MFA é necessária para concluir a autenticação do usuário'
            },
            statusCode: 402
          }
        )
        // MFA is required to complete user authentication.
        // Get the code from user and call:
        // cognitoUser.sendMFACode(code, this)
      }
      // customChallenge: function (challengeParameters) {
      //   // User authentication depends on challenge response
      //   let ClientMetaData = { application: application }
      //   cognitoUser.sendCustomChallengeAnswer(application, this, ClientMetaData)
      // }
    })
  })
}

async function getResendCode(username) {
  const params = {
    ClientId: process.env.COGNITO_POOL_WEB_ID,
    Username: username
  }

  try {
    const result = new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.resendConfirmationCode(params, function (err, data) {
        if (err) reject(err)
        else resolve(data)
      })
    })
    return await result
  } catch (error) {
    return { error }
  }
}

async function getLoginUser(params) {
  const { userName, password, code } = params
  const authenticationData = {
    Username: userName,
    Password: password
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
  const poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.COGNITO_POOL_WEB_ID
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: userName,
    Pool: userPool
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        let accessToken = result.getAccessToken().getJwtToken()
        resolve({ accessToken })
      },
      onFailure: function (err) {
        resolve({ error: err })
      },
      mfaRequired: (codeDeliveryDetails) => {
        resolve(
          {
            error: {
              message: 'A MFA é necessária para concluir a autenticação do usuário'
            },
            statusCode: 402
          }
        )
        // MFA is required to complete user authentication.
        // Get the code from user and call:
        // cognitoUser.sendMFACode(code, this)
      }
    })
  })
}

async function getUserRecover(username) {
  var filter = 'sub = "' + username + '"';

  const params = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    Filter: filter
  }
  try {
    const result = new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.listUsers(params, function (err, data) {
        if (err) {
          reject(err)
          throw new Error(`Cognito getPasswordUserRecover: ${err}`)
        } else {
          resolve(data)
        }
      })
    })
    return await result
  } catch (error) {
    return { error }
  }
}

async function getSetPassword(username, password) {
  var params = {
    Password: password,
    UserPoolId: process.env.AWS_USER_POOL_ID,
    Username: username,
    Permanent: true
  };

  try {
    const result = new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.adminSetUserPassword(params, function (err, data) {
        if (err) reject(err)
        else resolve(data)
      })
    })
    return await result
  } catch (error) {
    return { error }
  }
}

async function getCreateUser(params) {
  let poolData = {
    UserPoolId: process.env.AWS_USER_POOL_ID, // Your user pool id here
    ClientId: process.env.COGNITO_POOL_WEB_ID // Your client id here
  };
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeList = [];

  if (params.email) {
    let dataEmail = {
      Name: 'email',
      Value: params.email
    }
    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    )
    attributeList.push(attributeEmail)
  }

  if (params.phoneNumber) {
    let dataPhoneNumber = {
      Name: 'phone_number',
      Value: params.phoneNumber
    }
    let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataPhoneNumber
    )
    attributeList.push(attributePhoneNumber)
  }

  let ClientMetaData = params?.validate
    ? { validate: params.validate }
    : null

  return new Promise((resolve, reject) => {
    userPool.signUp(params.userName, params.password, attributeList, null, function (err, data) {
      if (err) resolve({ error: err })
      else resolve(data)
    }, ClientMetaData)
  })
}

async function ValidateCodCognito(params) {
  const { userName, confirmationCode } = params

  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.COGNITO_POOL_WEB_ID
  })

  let poolData = {
    Username: userName,
    Pool: userPool
  };
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(poolData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(confirmationCode, true, function (err, data) {
      if (err) resolve({ error: err })
      else resolve(data)
    })
  })
}

async function getForgotPassword(username) {
  var params = {
    ClientId: process.env.COGNITO_POOL_WEB_ID,
    Username: username
  };

  try {
    return new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.forgotPassword(params, function (err, data) {
        if (err) {
          resolve(err)
        } else {
          resolve(data)
        }
      })
    })
  } catch (error) {
    return { error }
  }
}

async function getConfirmForgotPassword(userData) {
  var params = {
    ClientId: process.env.COGNITO_POOL_WEB_ID,
    ConfirmationCode: userData.confirmationCode,
    Password: userData.password,
    Username: userData.userName
  };

  // try {
  return new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.confirmForgotPassword(params, function (err, data) {
      if (err) {
        resolve(err)
      } else {
        resolve(data)
      }
    })
  })
}

function signingCallback() {
  AWS.config.region = 'us-east-1';
  // Add the Google access token to the Cognito credentials login map.
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    RoleArn: 'arn:aws:cognito-idp:us-east-1:033896525836:userpool/us-east-1_eFMX5btyS',
    Logins: {
      'accounts.google.com': 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0ODNhMDg4ZDRmZmMwMDYwOWYwZTIyZjNjMjJkYTVmZTM5MDZjY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTI5NzU5NDQ1MDIxNTcxMjEyIiwiZW1haWwiOiJmbGF2aW9ndWlsaGVybWVwbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlZIajdScFFoOUV0TFc4THdib29aVVEiLCJuYW1lIjoiRmxhdmlvIEd1aWxoZXJtZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalhQTmhxRXFwd3p0dlI4R3lRWDJDTnFjMTEzLVNTMVFGZ1VoMXR5QT1zOTYtYyIsImdpdmVuX25hbWUiOiJGbGF2aW8iLCJmYW1pbHlfbmFtZSI6Ikd1aWxoZXJtZSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjU0NzQ3NDA2LCJleHAiOjE2NTQ3NTEwMDYsImp0aSI6ImJlYWZjOTNmY2FiZTg5ODUwMWUyZmE2MDk1NzNkZTFlOWM4MjE3N2YifQ.OxlIvtmNx2Ue3HakXhAW1oxPSko1orPccXdR7LCcRdJFm8cg8WHorM26zPDzXlgkiFjGHi_tLUwTeUFXyLadRTxb32T1Gm68dm2htS4yDg-RaTBZfdn5BwzB7bpPcc9CrHU75rUMaRUu7JHIZkRE-1Fy9rriJJ4GUj28y7yBB6uYf8mmqs8puB-OydmEAhU5e4YjPB9jtQHwKdfZMGjq-p0I9x9sCfhC8pOBHOjciXfgm94BYT0GOdbaEvRho8yiPowaAdpKRRulq4x9dfa5cRDBsPs2Em0pFPfV1eghQPtLEY_QTg7w06TgL_c0lF_PE8U86F7KOXbevTsuFbrX9w'
    }
  });

  // Obtain AWS credentials
  return new Promise((resolve, reject) => {
    AWS.config.credentials.get(function (err) {
      if (err) {
        resolve({ error: err })
      } else {
        resolve(AWS.config.credentials)
      }
    })
  })
}

async function signFederation() {
  let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0ODNhMDg4ZDRmZmMwMDYwOWYwZTIyZjNjMjJkYTVmZTM5MDZjY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTI5NzU5NDQ1MDIxNTcxMjEyIiwiZW1haWwiOiJmbGF2aW9ndWlsaGVybWVwbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InhTeWtyckRFVjRpQ3pWaTBXTHBWcUEiLCJuYW1lIjoiRmxhdmlvIEd1aWxoZXJtZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalhQTmhxRXFwd3p0dlI4R3lRWDJDTnFjMTEzLVNTMVFGZ1VoMXR5QT1zOTYtYyIsImdpdmVuX25hbWUiOiJGbGF2aW8iLCJmYW1pbHlfbmFtZSI6Ikd1aWxoZXJtZSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjU0OTk4MzQzLCJleHAiOjE2NTUwMDE5NDMsImp0aSI6IjBmZTc2YzAyY2Y0NDM5OWI1YmEwMGE0MWIzYzg0YmNmODNhZjdkZjgifQ.VluVDoNlqh6P05fAgZhI6BL2N5UcW_Si2YX3EmO9sRmLEnkhpHzzcf-9RhQjvzn76hL40lcJ3HhDi2VG4d_GT7y5yoC5UJt-3OUled7Ocuy3B9Yc_Qv_nGT7SyILfvc_U1a3oTNEdWRAyix58UCG_3r36FlHnh7ZPky9iBmwU6ybezFxgvF-VbD5dy3kywfch3ndKqQSwwTRJsI2VHb2PRgKV3cCdEkpqp86N1LKK045lqzQIyces55_jKrA1873FmRZypqWnCQM6NzVGKxocWAvmubWso11UBZQpM8qdIB6JfzUbLgp49zNQaBmTQ76k98I3OjoF8-R9X_DHZzxPQ'
  AWS.config.region = process.env.AWS_REGION ? process.env.AWS_REGION : 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    Logins: {
      'accounts.google.com': token
      // 'graph.facebook.com': token
    }
  });

  return new Promise((resolve, reject) => {
    AWS.config.credentials.get(async function (err) {
      if (err) {
        resolve({ error: err })
      } else {
        let accessKeyId = AWS.config.credentials.accessKeyId;
        let secretAccessKey = AWS.config.credentials.secretAccessKey;
        let sessionToken = AWS.config.credentials.sessionToken;
        let identityId = AWS.config.credentials.identityId;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
          IdentityId: '81f51eae-8fce-4c22-bb59-a98f5364ef56'
        });
        let result = await AWS.config.credentials.getPromise();
        resolve({
          message: 'Successfully signed in', accessKeyId, secretAccessKey, sessionToken, identityId
        })
      }
    })
  })
}

async function signIn() {
  let tokensData = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0ODNhMDg4ZDRmZmMwMDYwOWYwZTIyZjNjMjJkYTVmZTM5MDZjY2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA2MDgyMjI1NjMwLTl0ZDI1NjE2b2N1aGY4NjBlaWkzMDRmYXBsc2VlaGQzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MTI5NzU5NDQ1MDIxNTcxMjEyIiwiZW1haWwiOiJmbGF2aW9ndWlsaGVybWVwbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImNnLWJKSUp2SkNONVlGUGlGMlR6WFEiLCJuYW1lIjoiRmxhdmlvIEd1aWxoZXJtZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalhQTmhxRXFwd3p0dlI4R3lRWDJDTnFjMTEzLVNTMVFGZ1VoMXR5QT1zOTYtYyIsImdpdmVuX25hbWUiOiJGbGF2aW8iLCJmYW1pbHlfbmFtZSI6Ikd1aWxoZXJtZSIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjU1MDU2NzEzLCJleHAiOjE2NTUwNjAzMTMsImp0aSI6IjlkZGYwYjgwYjhlNTU5NjUwNjMwZmVlMzc3MzRhOGNjNTQzYjcwMmUifQ.QWE57PJzD6V6PVcyJfzSsKfvL2qVj6DXo4U97s8IWD-1GtyO_LRK2qeXUjSPRm0j2pTvpdukPFZUYV8pUw57LVDT5kwe9pFJv34labOuiUwKZN5vATB7V6alCHO6OqJi0RlLZN0a97d23l5hq3wj7aOzxBDhp8871d0PDCzBrS8pHTNkzYqSQXUM5ILbsRHA6atbqBVOSjgr8aWqHWQp8GsG-L1wB2cENcdxiXdEe3EKGaBlE4_Hqt7c4ZyMjjKh9gwCKxkRNOM_Gr5pcU18KCVbKsICRiOUw1YPum7T-iXmTQwqrt7KbOeOU9rNQ8lGHzdoN1yjdHmL94-p_ZQuSQ'

  var params = {
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    Logins: {
      'accounts.google.com': tokensData
      // 'graph.facebook.com': token
    },
    IdentityId: null
  };
  const cognitoidentity = new AWS.CognitoIdentity()

  return new Promise((resolve, reject) => {
    cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        resolve({ error: err })
      } else {
        console.log(data)
        resolve(data)
      }
    });
  })
}

export {
  getUser,
  getUserAllPol,
  getLogin,
  getLoginUser,
  getCreateUser,
  signFederation,
  getUserRecover,
  getSetPassword,
  ValidateCodCognito,
  getResendCode,
  signingCallback,
  signIn,
  getForgotPassword,
  getConfirmForgotPassword
}
