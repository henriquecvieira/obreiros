import usersByCreatedIdPresenter from "../presenters/usersByCreatedIdPresenter.mjs";
import UUIDGenerator from "../../support/UUIDGenerator.mjs";
import eventoEmitter from '../../events/EventEmitter.mjs';

class StoreUsers {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(params) {
    const resultCreateUser = [];
    const resultExistentUsers = [];
    for (const param of params) {
      let hasUser = await this.repository.getUserById(param.id);
      if (hasUser.length > 0) {
        console.log("users already exists!");
        const resultUser = usersByCreatedIdPresenter(hasUser);
        resultExistentUsers.push(resultUser);
        continue;
      }
      const newUser = {
        createdAt: new Date(),
        _id: UUIDGenerator.generate(),
        ...param,
      };
      resultCreateUser.push(newUser);
      eventoEmitter.emit('meuEvento', newUser)
    }
    const responseCreateUser = resultCreateUser.map((user) => ({
      ...user,
      createdAt: user.createdAt.toString(),
    }));
    return { resultExistentUsers, responseCreateUser };
  }
}

export default StoreUsers;
