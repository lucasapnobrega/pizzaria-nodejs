// adicionado o "user_id" na tipagem do Request | obs = definir a rota do @types no tsconfig

declare namespace Express {
  export interface Request {
    user_id: string;
  }
}