export default function logicalDeletePresenter(user) {
  const message = `o usuário ${user.name} que possui o _id ${user._id} foi inativado`
  return { message }
}
