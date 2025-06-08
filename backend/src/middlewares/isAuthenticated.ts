import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken)
    return res.status(401).end()

  const [_, token] = authToken.split(" ")
  
  try {
    // validar o token
    // sub (nesse caso, id do user) - defini no AuthUserService no "subject" do sign 
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload

    // recuperando o id do token e colocando dentro de uma variável "user_id" do req
    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).end()
  }
}