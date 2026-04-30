"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavorite = void 0;
const user_model_1 = require("../models/user.model");
const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;
        const user = await user_model_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isFavorite = user.favorites.includes(propertyId);
        if (isFavorite) {
            // ❌ remove
            user.favorites = user.favorites.filter((id) => id !== propertyId);
        }
        else {
            // ❤️ add
            user.favorites.push(propertyId);
        }
        await user.save();
        res.json(user.favorites);
    }
    catch (error) {
        console.error('TOGGLE FAVORITE ERROR:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.toggleFavorite = toggleFavorite;
