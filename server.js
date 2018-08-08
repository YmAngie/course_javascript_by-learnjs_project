let http = require('http'),
    static = require('node-static'),
    file = new static.Server('.', {
        cache: 0,
        // headers: 
    });

function accept(req, res) {
    file.serve(req, res);
}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');

// function accept(req, res)