import { FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';
import { config } from '../config';

export const mongodb: FastifyPluginAsync = async (fastify) => {
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
  } catch (error) {
    fastify.log.error(error, 'Error while connecting to MongoDB');
    process.exit(1);
  }
};

module.exports = { mongodb };
