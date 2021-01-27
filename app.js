const http = require('http');
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const server = http.createServer(routes);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
