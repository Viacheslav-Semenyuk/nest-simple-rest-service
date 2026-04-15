import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly databaseService;
    private readonly jwtService;
    private readonly configService;
    constructor(databaseService: DatabaseService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(refreshToken: string): Promise<void>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    private generateTokens;
}
