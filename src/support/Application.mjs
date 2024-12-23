const PRODUCTION = 'production'
const DEVELOPMENT = 'development'
const STAGING = 'staging'
const LOCAL = 'local'

function isEnvironmentEqualsTo(environment) {
  return process.env.ENVIRONMENT === environment
}

function isInProductionMode() {
  return isEnvironmentEqualsTo(PRODUCTION)
}

function isInStagingMode() {
  return isEnvironmentEqualsTo(STAGING)
}

function isInDevelopmentMode() {
  return isEnvironmentEqualsTo(DEVELOPMENT)
}

function isInLocalMode() {
  return isEnvironmentEqualsTo(LOCAL)
}

export default {
  isInProductionMode,
  isInStagingMode,
  isInDevelopmentMode,
  isInLocalMode
}
