import { NextFunction, Request, Response } from "express";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1] ?? "";

  try{
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId=decoded.userId;
    next()
  }catch{
    res.status(403).json({
      message:"Unauthorised Access"
    })
  }

}
