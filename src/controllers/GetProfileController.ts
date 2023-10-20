import { Request, Response } from "express";

export class GetProfileController {
  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
