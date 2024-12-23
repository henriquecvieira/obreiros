// form.js
export default {
  '/v1/updateUserForm': {
    post: {
      summary: 'Fill out registration',
      description: 'API documentation for my service!',
      tags: ['Formulário'],
      security: [
        {
          authToken: []
        }
      ],
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
                    firstName: { type: 'string' },
                    lastName: { type: 'string' }
                  },
                  required: ['firstName', 'lastName']
                },
                documents: {
                  type: 'object',
                  properties: {
                    cpf: { type: 'string' },
                    cnpj: { type: 'string' }
                  },
                  required: ['cpf', 'cnpj']
                },
                contact: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    mobile: { type: 'string' }
                  },
                  required: ['email', 'phone', 'mobile']
                },
                address: {
                  type: 'object',
                  properties: {
                    street: { type: 'string' },
                    number: { type: 'integer' },
                    complement: { type: 'string' },
                    neighborhood: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zipCode: { type: 'string' }
                  },
                  required: ['street', 'number', 'city', 'state', 'zipCode']
                },
                dates: {
                  type: 'object',
                  properties: {
                    registrationDate: { type: 'string', format: 'date-time' },
                    lastUpdateDate: { type: 'string', format: 'date-time' }
                  },
                  required: ['registrationDate']
                },
                art: {
                  type: 'object',
                  properties: {
                    number: { type: 'string' },
                    issueDate: { type: 'string', format: 'date' },
                    validity: { type: 'string', format: 'date' }
                  },
                  required: ['number', 'issueDate']
                },
                services: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      serviceDate: { type: 'string', format: 'date' },
                      completionDeadline: { type: 'string', format: 'date' },
                      status: { type: 'string', enum: ['Pending', 'In progress', 'Completed'] }
                    },
                    required: ['description', 'serviceDate', 'completionDeadline', 'status']
                  }
                },
                payments: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      method: { type: 'string', enum: ['Boleto', 'Card', 'Transfer'] },
                      amount: { type: 'number' },
                      dueDate: { type: 'string', format: 'date' },
                      paymentDate: { type: 'string', format: 'date' },
                      status: { type: 'string', enum: ['Pending', 'Paid', 'Overdue'] }
                    },
                    required: ['status']
                  }
                },
                notes: { type: 'string' },
                active: { type: 'boolean' }
              },
              required: ['name', 'documents', 'contact', 'address', 'dates', 'services', 'payments', 'notes', 'active']
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Client created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              }
            }
          }
        },
        400: {
          description: 'Bad Request'
        }
      }
    }
  },
  components: {
    securitySchemes: {
      authToken: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token for authorization'
      }
    }
  }
}
