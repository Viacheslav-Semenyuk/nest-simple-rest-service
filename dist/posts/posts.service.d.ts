import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from '../database/database.service';
export declare class PostsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createPostDto: CreatePostDto): import("@prisma/client").Prisma.Prisma__PostClient<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        content: string | null;
        published: boolean;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(page?: number, limit?: number): import("@prisma/client").Prisma.PrismaPromise<({
        author: {
            email: string;
            password: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    } & {
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        content: string | null;
        published: boolean;
        authorId: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PostClient<({
        author: {
            email: string;
            password: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    } & {
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        content: string | null;
        published: boolean;
        authorId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePostDto: UpdatePostDto): import("@prisma/client").Prisma.Prisma__PostClient<{
        author: {
            email: string;
            password: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    } & {
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        content: string | null;
        published: boolean;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PostClient<{
        title: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        content: string | null;
        published: boolean;
        authorId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
