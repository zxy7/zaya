import express from 'express';

export const dev = async () => {
    const app = express();
    app.get('/', (_req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Malita</title>
        </head>
        
        <body>
            <div id="malita">
                <span>loading...</span>
            </div>
        </body>
        </html>`);

    })
    app.listen(8888, async () => {
        console.log(`App listening at http://127.0.0.1:8888`)
    });
}