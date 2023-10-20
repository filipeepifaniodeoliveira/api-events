"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantController = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
const participantRepository_1 = require("../repositories/participantRepository");
class ParticipantController {
    async registerInEvent(req, res) {
        const { phone, category, avatar } = req.body;
        const { idEvent } = req.params;
        const id = parseInt(idEvent);
        if (!phone || !category) {
            return res.status(400).json({ mensagem: "Preencha os campos obrigatórios" });
        }
        const newParticipant = participantRepository_1.participantRepository.create({
            phone,
            category,
            avatar,
            name: req.user.name,
            email: req.user.email,
        });
        try {
            const reg = await participantRepository_1.participantRepository.save(newParticipant);
            if (id && reg) {
                const existsEvent = await eventRepository_1.eventRepository.findOne({
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
                const newEvent = await eventRepository_1.eventRepository.save(eventUpdate);
                return res.status(201).json(newEvent);
            }
            else {
                return res.status(400).json({ mensagem: "Tente Novamente mais tarde" });
            }
        }
        catch (error) {
            return res.status(400).json({ mensagem: "Tente Novamente mais tarde" });
        }
    }
}
exports.ParticipantController = ParticipantController;
