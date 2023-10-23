import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res.status(400).json({ mensagem: "E-mail ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "24h",
    });

    const { password: _,  ...userLogin } = user;
    return res.json({
      user: userLogin,
      token: token,
    })
  }
}
