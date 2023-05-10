import { envSchema, JSONSchemaType } from 'env-schema';

interface EnvType {
  HOST: string;
  PORT: number;
  MONGODB_HOST: string;
  MONGODB_PORT: number;
  MONGODB_DATABASE: string;
  MONGODB_USERNAME?: string;
  MONGODB_PASSWORD?: string;
  MONGODB_AUTHSOURCE?: string;
}

const schema: JSONSchemaType<EnvType> = {
  type: 'object',
  required: ['HOST', 'PORT', 'MONGODB_HOST', 'MONGODB_PORT'],
  properties: {
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    PORT: {
      type: 'number',
      default: 3030,
    },
    MONGODB_HOST: {
      type: 'string',
      default: 'localhost',
    },
    MONGODB_PORT: {
      type: 'number',
      default: 27017,
    },
    MONGODB_DATABASE: {
      type: 'string',
      default: 'vulture',
    },
    MONGODB_USERNAME: {
      type: 'string',
      nullable: true,
    },
    MONGODB_PASSWORD: {
      type: 'string',
      nullable: true,
    },
    MONGODB_AUTHSOURCE: {
      type: 'string',
      nullable: true,
    },
  },
};

let envConfig: EnvType;

try {
  envConfig = envSchema({
    dotenv: true,
    schema,
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}

const baseConfig = {
  ENV: process.env.NODE_ENV ?? 'production',
};

export const isDevelopment = baseConfig.ENV === 'development';
export const isProduction = baseConfig.ENV === 'production';

export const config = {
  ...envConfig,
  ...baseConfig,
};
