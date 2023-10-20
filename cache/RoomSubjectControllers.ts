import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";

export class RoomSubjectController {
  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });
      if (!room) {
        console.log("Aula não existe");
        return res.status(404).json("Aula não existe");
      }

      const subject = await subjectRepository.findOneBy({
        id: Number(subject_id),
      });
      if (!subject) {
        return res.status(404).json("Disciplina não existe");
      }

      const roomUpdate = {
        ...room,
        subjects: [subject],
      };

      await roomRepository.save(roomUpdate);

      return res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
