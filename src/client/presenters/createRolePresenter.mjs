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

export default function rolePresenter(params) {
  const message = `a função  ${params.role} foi cadastrada`;
  return { message };
}
