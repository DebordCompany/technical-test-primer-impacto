export enum EnvKeyEnum {
    VITE_BACK_API = "VITE_BACK_API"
}

export const getEnv = (key: keyof typeof EnvKeyEnum): string => {
    const envKey = EnvKeyEnum[key];
    const value = import.meta.env[envKey];
    if (!value) {
        throw new Error(`Environment variable ${envKey} is not defined`);
    }
    return value;
}