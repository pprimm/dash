'use strict';

function SocketService (config) {
    // service instance
    var Service = {};
    var pendingCallbacks = [];

    var hostname = config.hostname || window.location.hostname;
    var port = (config.port ? ':' + config.port : '') || (location.port ? ':' + location.port : '');
    var path = config.path || '';
    var wsUri = 'ws://' + hostname + port + path;

    var ws = new WebSocket(wsUri);

    ws.onopen = function () {
        // console.log('Socket opened!')
    };
    ws.onmessage = function (message) {
        onMessageReceived(JSON.parse(message.data));
    };

    function onMessageReceived (data) {
        // console.log('onMessageReceived, data:', data.Stats, 'ws.readyState', ws.readyState);
        pendingCallbacks.forEach(function (cb) {
           cb.call(null, data);
        });
    }

    function onStatsReceived (cb) {
        pendingCallbacks.push(cb);
    }

    Service.onStatsReceived = onStatsReceived;

    return Service;
}

module.exports = SocketService;