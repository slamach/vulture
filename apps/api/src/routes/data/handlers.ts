import { RouteHandler } from 'fastify';
import { format } from '@fast-csv/format';
import { IMetricProperty } from '@vulture/core';
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

export const getDataCsv: RouteHandler<{
  Querystring: IGetDataQuerystringSchema;
}> = async (request, reply) => {
  const { Data } = request.server.mongoose;
  const stream = format();

  const data = await Data.find({ ...request.query });
  if (data?.[0]?.toObject()?.payload) {
    stream.write(
      Array.from(
        (
          data[0].toObject().payload as unknown as Map<string, IMetricProperty>
        ).keys()
      )
    );
  }
  data.forEach((item) => {
    const itemObj = item.toObject();
    if (itemObj.payload) {
      stream.write(
        Array.from(
          (itemObj.payload as unknown as Map<string, IMetricProperty>).values()
        )
      );
    }
  });
  stream.end();

  return reply
    .header('Content-disposition', `attachment; filename=data.csv`)
    .type('text/csv')
    .send(stream);
};
