const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer()


server.get('/', (req, res) => {
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
  console.log(req);
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的url是 {{url}} </div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head><title>Hello</title></head>
      <body>${html}</body>
    </html>
  `)
  })
})

server.get('/test', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的url是 {{url}} </div>`
  })
  renderer.renderToString(app, (err, html) => {
      res.end('Internal Server Error')
      return
  })
})


server.listen(8080)
