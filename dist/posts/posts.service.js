"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let PostsService = class PostsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    create(createPostDto) {
        return this.databaseService.post.create({
            data: createPostDto,
        });
    }
    findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.databaseService.post.findMany({
            skip,
            take: limit,
            include: { author: true },
        });
    }
    findOne(id) {
        return this.databaseService.post.findUnique({
            where: { id },
            include: { author: true },
        });
    }
    update(id, updatePostDto) {
        return this.databaseService.post.update({
            where: { id },
            data: updatePostDto,
            include: { author: true },
        });
    }
    remove(id) {
        return this.databaseService.post.delete({
            where: { id },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PostsService);
//# sourceMappingURL=posts.service.js.map