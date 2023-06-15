(function () {
    'use strict';

    var express = require('express');
    var app = express();
    var path = require('path');

    var PORT = process.env.PORT || 4001; // set our port
    var STATIC_DIR = 'public';

    app.use(express.static(__dirname + '/' + STATIC_DIR));

    // start app ===============================================
    app.listen(PORT, function () {
        console.log('Server running on port %d', PORT);
    });

    app.get('*', function(req, res) {
        res.sendFile(path.resolve( STATIC_DIR, 'index.html'));
    });

    try {
        process.on('SIGINT', function () {
            process.exit(0);
        });
    } catch (e) {}

})();
