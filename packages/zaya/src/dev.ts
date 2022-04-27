import type { ServeOnRequestArgs } from 'esbuild';
import { serve } from 'esbuild';
import express from 'express';
import path from 'path';
import { cwd } from 'process';
import { DEFAULT_BUILD_PORT, DEFAULT_ENTRY_POINT, DEFAULT_HOST, DEFAULT_OUTDIR, DEFAULT_PLATFORM, DEFAULT_PORT } from './constants';

export const dev = async () => {
    const app = express();
    app.get('/', (_req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Zaya</title>
        </head>
        
        <body>
            <div id="zaya">
                <span>loading...</span>
            </div>
            <script src="http://${DEFAULT_HOST}:${DEFAULT_BUILD_PORT}/index.js"></script>

        </body>
        </html>`);

    })

    app.listen(DEFAULT_PORT, async () => {
        console.log(`App listening at http://${DEFAULT_HOST}:${DEFAULT_PORT}`)
        try {
            const devServe = await serve({
                port: DEFAULT_BUILD_PORT,
                host: DEFAULT_HOST,
                servedir: DEFAULT_OUTDIR,
                onRequest: (args: ServeOnRequestArgs) => {
                    if (args.timeInMS) {
                        console.log(
                            `${args.method}: ${args.path} ${args.timeInMS} ms`
                        );
                    }
                },
            }, {
                format: 'iife',
                logLevel: 'error',
                outdir: DEFAULT_OUTDIR,
                platform: DEFAULT_PLATFORM,
                bundle: true,
                define: {
                    'process.env.NODE_ENV': JSON.stringify('development'),
                },
                entryPoints: [path.resolve(cwd(), DEFAULT_ENTRY_POINT)],
            });

            process.on('SIGINT', () => {
                devServe.stop();
                process.exit(0);
            });
            process.on('SIGTERM', () => {
                devServe.stop();
                process.exit(1);
            });
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
    });
}