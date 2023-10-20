"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
class EventController {
    async createEvent(req, res) {
        const { name, description, local, type, date, agents, avatar, url } = req.body;
        const user = req.user;
        const existsEvent = await eventRepository_1.eventRepository.findOneBy({ name });
        if (existsEvent) {
            return res
                .status(400)
                .json({ mensagem: "Já existe um evento com o mesmo nome cadastrado" });
        }
        if (!name ||
            !description ||
            !local ||
            !type ||
            !date ||
            !agents ||
            !avatar ||
            !url) {
            return res
                .status(400)
                .json({ mensagem: "Preencha os campos obrigatórios" });
        }
        const { role: _, ...userData } = user;
        const newEvent = eventRepository_1.eventRepository.create({
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
        await eventRepository_1.eventRepository.save(newEvent);
        return res.status(201).json(newEvent);
    }
    async listEvents(req, res) {
        const { name } = req.params;
        if (name) {
            const existsEvent = await eventRepository_1.eventRepository.findOneBy({ name });
            if (!existsEvent) {
                return res
                    .status(400)
                    .json({ mensagem: "O evento não foi encontrado" });
            }
            return res.status(201).json([existsEvent]);
        }
        else {
            const events = await eventRepository_1.eventRepository.find({
                relations: {
                    participants: true,
                },
            });
            return res.status(201).json(events);
        }
    }
    async getEventById(req, res) {
        const { id } = req.params;
        const n = parseInt(id);
        if (id) {
            const existsEvent = await eventRepository_1.eventRepository.findOne({
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
    async getMyEvents(req, res) {
        const myId = req.user.id;
        if (!myId) {
            return res.status(400).json({
                mensagem: "Você precisa estar logado para realizar esta ação",
            });
        }
        const mysEvents = await eventRepository_1.eventRepository.find({
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
        }
        else {
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
exports.EventController = EventController;
