// loginUser.js
export default {
  '/v1/loginUser': {
    post: {
      summary: 'User login',
      description: 'API documentation for user login in the system.',
      tags: ['Login'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                contact: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'Email address of the user (stored in the contact object)'
                    }
                  },
                  required: ['email'],
                  description: 'User contact details',
                },
                password: {
                  type: 'string',
                  minLength: 8,
                  description: 'Password for the user account'
                }
              },
              required: ['contact', 'password'],
              additionalProperties: false
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    description: 'JWT token for user authentication'
                  },
                  applicationToken: {
                    type: 'string',
                    description: 'Token for application authentication'
                  }
                },
                required: ['token', 'applicationToken'],
                additionalProperties: false
              }
            }
          }
        },
        400: {
          description: 'Bad Request - Invalid email or password'
        },
        401: {
          description: 'Unauthorized - Incorrect email or password'
        },
        500: {
          description: 'Internal Server Error'
        }
      }
    }
  }
}
