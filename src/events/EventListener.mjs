import eventoEmitter from "../events/EventEmitter.mjs"
import RepositoryImpl from "../../infra/repository/index.mjs"
import UserRepository from "../client/repositories/userRepository.mjs"

const Repository = new UserRepository(RepositoryImpl)

// eventoEmitter.on('User Created', (newUser) => {
//   Repository.save(newUser);
// });
// eventoEmitter.on('Formulario atualizado', (updateForm) => {
//   Repository.save(updateForm);
// });
