import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if(!email) 
      throw new Error("Insira o e-mail")

    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(userAlreadyExist)
      throw new Error("Usuário já existe")

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }
}

export { CreateUserService }