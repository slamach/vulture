import { RouteHandler } from 'fastify';
import { ICreateDataBodySchema, IGetDataQuerystringSchema } from './schemas';

// TODO: Add error handling

export const getData: RouteHandler<{
  Querystring: IGetDataQuerystringSchema;
}> = async (request) => {
  const { Data } = request.server.mongoose;

  return await Data.find({ ...request.query });
};

export const createData: RouteHandler<{ Body: ICreateDataBodySchema }> = async (
  request
) => {
  // TODO: Add payload and metricId validation
  const { Data } = request.server.mongoose;

  const data = new Data({
    ...request.body,
    timestamp: new Date(),
  });

  return await data.save();
};
