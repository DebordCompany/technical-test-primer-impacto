import dotenv from 'dotenv';
dotenv.config();

export enum EnvKeyEnum {
    RCC_API = "RCC_API",
    POSTGRES_PORT = "POSTGRES_PORT",
    POSTGRES_USER = "POSTGRES_USER",
    POSTGRES_PASSWORD = "POSTGRES_PASSWORD",
    POSTGRES_DB = "POSTGRES_DB",
    POSTGRES_HOST = "POSTGRES_HOST",
    FRONT_URL = "FRONT_URL",
}

export const getEnv = (key: keyof typeof EnvKeyEnum): string => {
    const envKey = EnvKeyEnum[key];
    const value = process.env[envKey];
    if (!value) {
        throw new Error(`Environment variable ${envKey} is not defined`);
    }
    return value;
}