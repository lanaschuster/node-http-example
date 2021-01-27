const fs = require('fs')

const requestHandler = (req, res) => {
  console.log(req.method, req.url)

  const url = req.url
  const method = req.method

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Hello World!</title></head>')
    res.write('<body>')
    res.write('<form action="/message" method="POST">')
    res.write('<input type="text" name="message"/><br>')
    res.write('<button type="submit">Enviar</button>')
    res.write('</form>')
    res.write('</body>')
    res.write('</html>')
    return res.end()
  }
  
  if (url === '/message' && method === 'POST') {

    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      fs.writeFile('message.txt', message, (err) => {
        if (!err) {
          res.statusCode = 302
          res.setHeader('Location', '/')
          res.end()
        }
      })
    })
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<head><title>Hello World</title></head>')
  res.write('<body>')
  res.write('<h1>Node.js http example!</h1>')
  res.write('</body>')
  res.write('</html>')
  res.end()
}

module.exports = requestHandler
