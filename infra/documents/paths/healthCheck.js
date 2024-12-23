export default
  {
    '/healthcheck': {
      get: {
        tags: ['Health Check'],
        description: 'verification route ok, server is up!!',
        parameters: [],
        responses: {
          200: {
            description: 'OK'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  }
