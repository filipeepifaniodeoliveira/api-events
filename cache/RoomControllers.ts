import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    try {
      const newRoom = roomRepository.create({
        name,
        description,
      });

      await roomRepository.save(newRoom);
      console.log(newRoom);
      return res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
        },
      });
      console.log(rooms);
      return res.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
