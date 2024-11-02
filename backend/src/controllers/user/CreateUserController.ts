import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

// Controller -> Aqui a gente recebe, pega os dados e repassa para o Service. Vão conectar diretamente com as rotas.
// Service -> Trabalha com o BD, validações, etc. Fazer a lógica em si.

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, password })

    return res.json(user)
  }
}

export { CreateUserController }