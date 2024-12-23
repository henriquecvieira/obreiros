export default
{
  alg: process.env.JWT_ALG,
  e: process.env.JWT_E,
  kid: process.env.JWT_KID,
  kty: process.env.JWT_KTY,
  n: process.env.JWT_N,
  use: process.env.JWT_USE
}

// https://cognito-idp.us-east-1.amazonaws.com/us-east-1_eFMX5btyS/.well-known/jwks.json
