import { getUserAllPol as getUserFromProvider } from '../../../infra/auth_provider/index.mjs';

async function getUser(token) {
  try {
    return getUserFromProvider(token)
  } catch (error) {
    return null
  }
}

export default {
  getUser
}
