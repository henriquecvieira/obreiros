export default function userByIdPresenter(user) {
  const {
    _id,
    contact = {},
    createdAt,
    name,
    active,
    address = {},
    art = {},
    dates = {},
    documents = {},
    notes = [],
    payments = [],
    services = [],
    updatedAt,
    userType,
  } = user

  return {
    _id,
    name,
    documents: {
      cpf: documents.cpf || null,
      cnpj: documents.cnpj || null,
      rg: documents.rg || null,
    },
    contact: {
      email: contact.email || null,
      phone: contact.phone || null,
      mobile: contact.mobile || null,
    },
    address: {
      street: address.street || null,
      number: address.number || null,
      complement: address.complement || null,
      neighborhood: address.neighborhood || null,
      city: address.city || null,
      state: address.state || null,
      zipCode: address.zipCode || null,
    },
    dates: {
      registrationDate: dates.registrationDate || null,
      lastUpdateDate: dates.lastUpdateDate || null,
      birthDate: dates.birthDate || null,
    },
    art: {
      number: art.number || null,
      issueDate: art.issueDate || null,
      validity: art.validity || null,
    },
    services: services.map((service) => ({
      description: service.description,
      serviceDate: service.serviceDate,
      completionDeadline: service.completionDeadline,
      status: service.status,
    })),
    payments: payments.map((payment) => ({
      method: payment.method,
      amount: payment.amount,
      dueDate: payment.dueDate,
      paymentDate: payment.paymentDate,
      status: payment.status,
    })),
    notes,
    active,
    createdAt,
    updatedAt,
    userType,
  }
}
