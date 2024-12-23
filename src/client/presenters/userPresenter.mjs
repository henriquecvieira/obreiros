// export default function userPresenter(user) {
//   const { _id, name, email } = user;

//   return {
//     _id: user._id,
//     name: {
//       firstName: user.name ? user.name.firstName : "DefaultFirstName",
//       lastName: user.name ? user.name.lastName : "DefaultLastName"
//     },
//     email: user.email,
//   };
// }

export default function userPresenter(user) {
  const message = `o obreiro(a) ${user.name} foi cadastrado(a)`;
  return { message };
}
