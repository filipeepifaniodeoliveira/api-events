import { AppDataSource } from "../data-source";
import { Participant } from "../entities/Participant";

export const participantRepository = AppDataSource.getRepository(Participant);