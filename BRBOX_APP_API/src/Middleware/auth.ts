import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../Model/User";
import { AppDataSource } from '../data-source';

export default async function(req: Request, res: Response, next: NextFunction) {
  const token = req.header("auth_token");

  if (!token) return res.status(401).json({"message": "Access Denied"});

  try {
    const tokenSecret = String(process.env.TOKEN_SECRET);
    const tokenValue = jwt.verify(token, tokenSecret);

    const user = await AppDataSource.getRepository(User).findOneBy({
      id: (<any>tokenValue)._id
    });
  
    console.log("\n\n\tUSER: " + user?.id)
    if(!user) 
      throw "!user"
    

    req.user = tokenValue;
    console.log(tokenValue);

    next();

  } catch(error) {
      res.status(400).json({message: "Unauthorized"});
  }
}