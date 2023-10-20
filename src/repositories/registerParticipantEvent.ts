import { AppDataSource } from "../data-source";
import { Event } from "../entities/Event";

export const registerParticipantRepository = AppDataSource.getRepository(Event);