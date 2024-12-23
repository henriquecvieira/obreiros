import healthCheck from './paths/healthCheck.js'
import updateUserForm from './paths/components/form.js'
import createUser from './paths/components/createUser.js'
import login from './paths/components/loginUser.js'


let paths = Object.assign(
  healthCheck,
  updateUserForm,
  createUser,
  login

)

export default paths
