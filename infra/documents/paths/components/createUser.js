// createUser.js
export default {
  '/v1/create': {
    post: {
      summary: 'Create a new user',
      description: 'API documentation for creating a new user in the system.',
      tags: ['Create User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'object',
                  properties: {
                    firstName: {
                      type: 'string',
                      description: 'First name of the user'
                    },
                    lastName: {
                      type: 'string',
                      description: 'Last name of the user'
                    }
                  },
                  required: ['firstName', 'lastName'],
                  description: 'Name of the user',
                },
                contact: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'Email address of the user'
                    }
                  },
                  required: ['email'],
                  description: 'Contact details of the user',
                },
                password: {
                  type: 'string',
                  minLength: 8,
                  description: 'Password for the user account',
                }
              },
              required: ['name', 'contact', 'password'],
              additionalProperties: false
            }

          }
        }
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'object',
                    properties: {
                      firstName: {
                        type: 'string',
                        description: 'First name of the user'
                      },
                      lastName: {
                        type: 'string',
                        description: 'Last name of the user'
                      }
                    },
                    required: ['firstName', 'lastName'],
                    description: 'Name of the user',
                  },
                  contact: {
                    type: 'object',
                    properties: {
                      email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user'
                      }
                    },
                    required: ['email'],
                    description: 'Contact details of the user',
                  },
                  password: {
                    type: 'string',
                    minLength: 8,
                    description: 'Password for the user account',
                  }
                },
                required: ['name', 'contact', 'password'],
                additionalProperties: false
              }

            }
          },
          400: {
            description: 'Bad Request'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  }
}
