"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const serverless_express_1 = require("@vendia/serverless-express"); // Correct import
let cachedServer;
async function bootstrap() {
    const server = express(); // Initialize express server
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    await app.init(); // Initialize NestJS app
    return (0, serverless_express_1.default)({ app: server }); // Wrap express server with serverless
}
bootstrap().then((handler) => {
    module.exports.handler = handler; // Export the serverless handler
});
