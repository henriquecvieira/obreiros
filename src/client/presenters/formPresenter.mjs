export default function clientPresenter(client) {
  const { name, documents, contact, address, dates, art, services, payments, notes, active } = client;

  return {
    name: name,
    documents: {
      cpf: documents.cpf,
      rg: documents.rg,
      cnpj: documents.cnpj
    },
    contact: {
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile
    },
    address: {
      street: address.street,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode
    },
    dates: {
      registrationDate: dates.registrationDate,
      lastUpdateDate: dates.lastUpdateDate,
      birthDate: dates.birthDate
    },
    art: {
      number: art.number,
      issueDate: art.issueDate,
      validity: art.validity
    },
    services: services.map(service => ({
      description: service.description,
      serviceDate: service.serviceDate,
      completionDeadline: service.completionDeadline,
      status: service.status
    })),
    payments: payments.map(payment => ({
      method: payment.method,
      amount: payment.amount,
      dueDate: payment.dueDate,
      paymentDate: payment.paymentDate,
      status: payment.status
    })),
    notes: notes,
    active: active
  };
}
