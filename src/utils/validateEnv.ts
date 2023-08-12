import { cleanEnv, str, port } from 'envalid';

const validateEnv = (): void => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port({ default: 8280 }),
        DB_TYPE: str(),
        DB_NAME: str(),
        DB_HOST: str(),
        DB_PORT: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),
    });
};

export default validateEnv;
