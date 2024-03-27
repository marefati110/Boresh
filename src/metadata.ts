/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./DTOs/link.dto"), { "SaveLink": { hostname: { required: true, type: () => String } } }]], "controllers": [[import("./controllers/app.controller"), { "AppController": { "redirect": {} } }], [import("./controllers/link.controller"), { "LinkController": { "create": { type: Object } } }]] } };
};