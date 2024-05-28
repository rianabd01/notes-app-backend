const http = require('http');

const requestListener = (req, res) => {
  res.setHeader('Content-type', 'text/html');

  const { method, url } = req;
  if (url === '/') {
    if (method === 'GET') {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: 'Ini adalah homepage',
        })
      );
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: 'Halo! Ini adalah halaman about',
        })
      );
    } else if (method === 'POST') {
      let body = [];

      req.on('data', (chunk) => {
        body.push(chunk);
      });

      req.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            message: `Halo, ${name}! Ini adalah halaman about`,
          })
        );
      });
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses menggunakan ${method} request`,
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: 'Halaman tidak ditemukan!',
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
