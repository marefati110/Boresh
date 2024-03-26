/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./DTOs/link.dto"), { "SaveLink": { ali: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./controllers/link.controller"), { "LinkController": { "create": { type: Object } } }]] } };
};