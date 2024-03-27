/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./DTOs/link.dto"), { "SaveLink": { hostname: { required: true, type: () => String } } }], [import("./DTOs/domain.dto"), { "SaveDomain": {} }]], "controllers": [[import("./controllers/app.controller"), { "AppController": { "getHello": { type: String }, "redirect": {} } }], [import("./controllers/link.controller"), { "LinkController": { "create": { type: Object } } }], [import("./controllers/domain.controller"), { "DomainController": { "create": { type: Object } } }]] } };
};