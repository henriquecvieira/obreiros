/* eslint-disable camelcase */
export default function usersByCreatedIdPresenter(storeUsers) {
  return storeUsers.map(
    ({ id, createdAt, _id, name, email, address, phone, website, company }) => ({
      id,
      createdAt,
      _id,
      name,
      email,
      address,
      phone,
      website,
      company,
    })
  )
}
