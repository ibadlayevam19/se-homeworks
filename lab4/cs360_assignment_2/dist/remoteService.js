"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteGet = remoteGet;
exports.remotePost = remotePost;
exports.remoteDelete = remoteDelete;
const axios_1 = __importDefault(require("axios"));
function resolveUrl(resource) {
    const baseUrl = "http://localhost:4001";
    return `${baseUrl}${resource}`;
}
async function remoteGet(resource) {
    const res = await axios_1.default.get(resolveUrl(resource));
    return res.data;
}
async function remotePost(resource, body) {
    const res = await axios_1.default.post(resolveUrl(resource), body);
    return res.data;
}
async function remoteDelete(resource) {
    const res = await axios_1.default.delete(resolveUrl(resource));
    return res.data;
}
