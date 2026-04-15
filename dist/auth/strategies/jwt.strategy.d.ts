import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly databaseService;
    constructor(configService: ConfigService, databaseService: DatabaseService);
    validate(payload: any): Promise<{
        userId: number;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
export {};
