/* eslint-disable @typescript-eslint/no-explicit-any */
// Vercel serverless function to proxy TMDB API requests

import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Request, Response } from 'express';

const apiProxy = createProxyMiddleware({
  target: process.env['TMDB_API_URL'],
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: proxyReq => {
    proxyReq.setHeader(
      'Authorization',
      `Bearer ${process.env['TMDB_API_TOKEN']}`
    );
  },
});

// Expose the proxy on the "/api/*" endpoint.
export default async function (req: Request<any>, res: Response<any>) {
  return apiProxy(req, res, () => ({}));
}
