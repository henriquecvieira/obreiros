export default function userByIdPresenter(user) {
  const { _id, contact = {}, name, active, userType } = user

  return {
    _id,
    name,
    contact: {
      email: contact.email || null,
      phone: contact.phone || null,
      mobile: contact.mobile || null,
    },
    active,
    userType,
  }
}
