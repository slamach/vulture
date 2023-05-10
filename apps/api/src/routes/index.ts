import { FastifyPluginAsync } from 'fastify';
import { Kitten } from '../models';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/kitty', async () => {
    const kittens = await Kitten.find();

    return kittens;
  });

  fastify.post('/kitty', async () => {
    const kitty = new Kitten({ name: 'Kitty' });
    await kitty.save();

    return 'Success!';
  });
};
