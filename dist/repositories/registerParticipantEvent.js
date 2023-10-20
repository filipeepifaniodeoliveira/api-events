"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerParticipantRepository = void 0;
const data_source_1 = require("../data-source");
const Event_1 = require("../entities/Event");
exports.registerParticipantRepository = data_source_1.AppDataSource.getRepository(Event_1.Event);
