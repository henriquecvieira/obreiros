/* eslint-disable no-dupe-keys */
import paths from './paths.js'
import createUser from '../documents/paths/components/createUser.js'
import form from '../documents/paths/components/form.js'


export default
  {
    openapi: '3.0.0',
    info: {
      title: 'Volume API',
      description: 'Project documentation API Register Clients',
      version: '1.0.1'
    },
    host: process.env.API_URL,
    paths: paths,
    components: {
      createUser: createUser,
      form: form
    }
  }
