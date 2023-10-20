import { Request, Response } from "express";
import { eventRepository } from "../repositories/eventRepository";
import { participantRepository } from "../repositories/participantRepository";

export class ParticipantController {
  async registerInEvent(req: Request, res: Response) {
    const { phone, category, avatar } = req.body;
    const { idEvent }: any = req.params;
    const id = parseInt(idEvent);

    if (!phone || !category) {
      return res.status(400).json({ mensagem: "Preencha os campos obrigatórios" });
    }

    const newParticipant = participantRepository.create({
      phone,
      category,
      avatar,
      name: req.user.name,
      email: req.user.email,
    });

    try {
      const reg = await participantRepository.save(newParticipant);
      if (id && reg) {
        const existsEvent = await eventRepository.findOne({  
          relations: {
            participants: true,
          },
          where: {
            id
          } 
        });

        if (!existsEvent) {
          return res.status(400).json({ mensagem: "Evento indisponível" });
        } 

        let arr = existsEvent.participants;
        arr.push(newParticipant);
        const eventUpdate = {
          ...existsEvent,
          participants: arr,
        };

        const newEvent = await eventRepository.save(eventUpdate);
        return res.status(201).json(newEvent);
      } else {
        return res.status(400).json({ mensagem: "Tente Novamente mais tarde" });
      }
    } catch (error) {
      return res.status(400).json({ mensagem: "Tente Novamente mais tarde" });
    }
  }
}
