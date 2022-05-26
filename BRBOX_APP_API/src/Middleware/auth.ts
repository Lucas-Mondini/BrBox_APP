import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../Model/User";
import { AppDataSource } from '../data-source';

export default class Auth {
  
  constructor() {

  }
  
  public static async user (req: Request, res: Response, next: NextFunction) {
    const value = await Auth.auth(req.header("auth_token"))
    if(value.status != 200) {
      return res.status(value.status).json(value.value);
    }
    req.user = value.value;
    next();
  }

  public static async admin (req: Request, res: Response, next: NextFunction) {
    const value = await Auth.auth(req.header("auth_token"))
    console.log((<any>value.value).admin)
    if(value.status != 200 || !(<any>value.value).admin) {
      return res.status(400).json({ message:"Unauthorized"});
    }
    req.user = value.value;
    next();
  }
  
  private static auth = async  (token: string | undefined) => {
    
    if (!token) 
      return {status: 401, value:{ message:"Access Denied"}};
    
    try {
      const tokenSecret = String(process.env.TOKEN_SECRET);
      const tokenValue = jwt.verify(token, tokenSecret);
      
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: (<any>tokenValue)._id
      });
      
      if(!user) 
      throw "!user"
      
      return {status: 200, value: tokenValue}
      
    } catch(error) {
      return {status: 400, value:{message: "Unauthorized"}};
    }
  }
}