"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.getById = exports.getAll = void 0;
const property_model_1 = require("../models/property.model");
//повертає всі об'єкти з бази
const getAll = (filter) => {
    return property_model_1.PropertyModel.find(filter);
};
exports.getAll = getAll;
//шукає один документ по ID
const getById = async (id) => {
    return property_model_1.PropertyModel.findById(id);
};
exports.getById = getById;
//створює новий запис
const create = async (data) => {
    return property_model_1.PropertyModel.create(data);
};
exports.create = create;
//видаляє документ по ID
const remove = async (id) => {
    return property_model_1.PropertyModel.findByIdAndDelete(id);
};
exports.remove = remove;
