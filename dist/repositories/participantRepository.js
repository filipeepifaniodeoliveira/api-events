"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantRepository = void 0;
const data_source_1 = require("../data-source");
const Participant_1 = require("../entities/Participant");
exports.participantRepository = data_source_1.AppDataSource.getRepository(Participant_1.Participant);
