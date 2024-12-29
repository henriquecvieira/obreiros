import RepositoryImpl from "../../../infra/repository/index.mjs"
import RoleRepository from "../repositories/roleRepository.mjs"
import createRoleValidator from "./validators/roles.mjs"
import createRolePresenter from "../presenters/createRolePresenter.mjs"
import Role from "../use_cases/roleUseCase.mjs"

const RLRepository = new RoleRepository(RepositoryImpl)


export async function newRole(req, res, next) {
  try {
    const data = req.body 
    await createRoleValidator.validate(data)
    const RoleUseCase = new Role(RLRepository)
    const newRole = await RoleUseCase.execute(data)
    await RLRepository.save(newRole)
    const result = createRolePresenter(newRole)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}
