import { Request, Response } from "express";
import { eventRepository } from "../repositories/eventRepository";

export class EventController {
  async createEvent(req: Request, res: Response) {
    const { name, description, local, type, date, agents, avatar, url } =
      req.body;
    const user = req.user;
    const existsEvent = await eventRepository.findOneBy({ name });

    if (existsEvent) {
      return res
        .status(400)
        .json({ mensagem: "Já existe um evento com o mesmo nome cadastrado" });
    }

    if (
      !name ||
      !description ||
      !local ||
      !type ||
      !date ||
      !agents ||
      !avatar ||
      !url
    ) {
      return res
        .status(400)
        .json({ mensagem: "Preencha os campos obrigatórios" });
    }

    const { role: _, ...userData } = user;
    const newEvent = eventRepository.create({
      name,
      description,
      local,
      type,
      date,
      agents,
      avatar,
      url,
      user: userData,
    });

    await eventRepository.save(newEvent);
    return res.status(201).json(newEvent);
  }

  async listEvents(req: Request, res: Response) {
    const { name } = req.params;
    if (name) {
      const existsEvent = await eventRepository.findOneBy({ name });
      if (!existsEvent) {
        return res
          .status(400)
          .json({ mensagem: "O evento não foi encontrado" });
      }
      return res.status(201).json([existsEvent]);
    } else {
      const events = await eventRepository.find({
        relations: {
          participants: true,
        },
      });
      return res.status(201).json(events);
    }
  }

  async getEventById(req: Request, res: Response) {
    const { id } = req.params;
    const n = parseInt(id);
    if (id) {
      const existsEvent = await eventRepository.findOne({
        relations: {
          participants: true,
        },
        where: {
          id: n,
        },
      });
      if (!existsEvent) {
        return res
          .status(400)
          .json({ mensagem: "O evento não foi encontrado" });
      }
      return res.status(201).json([existsEvent]);
    }
  }

  async getMyEvents(req: Request, res: Response) {
    const myId = req.user.id;
    if (!myId) {
      return res.status(400).json({
        mensagem: "Você precisa estar logado para realizar esta ação",
      });
    }
    const mysEvents = await eventRepository.find({
      relations: {
        user: true,
        participants: true,
      },
      where: {
        user: req.user,
      },
    });

    if (mysEvents.length === 0) {
      return res.status(400).json({
        mensagem: "Você ainda não possue eventos cadastrados",
      });
    } else {
      const newArr = mysEvents.map((event) => {
        const { password: _, ...user } = event.user;
        return {
          ...event,
          user,
        };
      });
      return res.status(201).json(newArr);
    }
  }
}
