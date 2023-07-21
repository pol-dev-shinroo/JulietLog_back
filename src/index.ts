import 'source-map-support/register';
import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import { validateEnv } from '@/utils/index';
import { controllers } from '@/controllers/index';

validateEnv();
const app = new App({
    controllers: [...controllers],
});

app.bootstrap();
