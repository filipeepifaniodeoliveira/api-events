"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileController = void 0;
class GetProfileController {
    async getProfile(req, res) {
        return res.json(req.user);
    }
}
exports.GetProfileController = GetProfileController;
