"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const user_model_1 = require("../models/user.model");
const router = (0, express_1.Router)();
// ❤️ toggle favorite
router.post('/favorites', auth_middleware_1.verifyToken, user_controller_1.toggleFavorite);
// 👤 get me
router.get('/me', auth_middleware_1.verifyToken, async (req, res) => {
    const user = await user_model_1.UserModel.findById(req.user.id);
    res.json(user);
});
exports.default = router;
