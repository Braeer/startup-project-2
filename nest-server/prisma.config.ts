import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

type Env = {
  POSTGRES_URL: string;
};

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env<Env>('POSTGRES_URL'),
  },
});
