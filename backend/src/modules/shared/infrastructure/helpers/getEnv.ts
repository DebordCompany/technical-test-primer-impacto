export enum EnvKeyEnum {
    RCC_API = 'RCC_API',
}

export const getEnv = (key: keyof typeof EnvKeyEnum): string => {
    const envKey = EnvKeyEnum[key];
    const value = process.env[envKey];
    if (!value) {
        throw new Error(`Environment variable ${envKey} is not defined`);
    }
    return value;
}