let http = require('http'),
    static = require('node-static'),
    file = new static.Server('.', {
        cache: 0,
        // headers:
    });

function accept(req, res) {
    if (req.url.startsWith('/api')) {
        setTimeout(() => {
            file.serve(req, res);
        }, 1000);
    } else {
        file.serve(req, res);
    }
}

http.createServer(accept).listen(8000);

console.log('Server running on port 8000');
