import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { config } from '../config';
import { models } from '../models';

declare module 'fastify' {
  interface FastifyInstance {
    mongoose: typeof models;
  }
}

export const mongooseConnector = fp(async (fastify) => {
  try {
    mongoose.connection.on('connected', () => {
      fastify.log.info('Connected to MongoDB');
    });
    mongoose.connection.on('disconnected', () => {
      fastify.log.error('Disconnected from MongoDB');
    });
    mongoose.connection.on('error', (error) => {
      fastify.log.error(error, 'Error while using MongoDB');
    });

    await mongoose.connect(
      `mongodb://${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_DATABASE}`,
      {
        authSource: config.MONGODB_AUTHSOURCE,
        user: config.MONGODB_USERNAME,
        pass: config.MONGODB_PASSWORD,
      }
    );

    fastify.decorate('mongoose', models);
  } catch (error) {
    fastify.log.error(error, 'Error while connecting to MongoDB');
    process.exit(1);
  }
});
