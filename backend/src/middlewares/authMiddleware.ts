import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Tokem näo informado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        req.usuarioId = Number(payload.id);

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido"
        });
    }
}