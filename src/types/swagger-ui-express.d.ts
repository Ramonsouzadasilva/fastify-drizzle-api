declare module 'swagger-ui-express' {
  import type { RequestHandler } from 'express';

  export const serve: RequestHandler[];

  export function setup(
    swaggerDoc: any,
    options?: {
      explorer?: boolean;
      swaggerOptions?: Record<string, any>;
      customCss?: string;
      customJs?: string | string[];
      customfavIcon?: string;
      customSiteTitle?: string;
    },
  ): RequestHandler;
}
