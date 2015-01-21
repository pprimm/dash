// This file bootstraps the entire application.
var DashboardApp = require('./components/DashboardApp.react');
var React = require('react');
var SocketService = require('./services/SocketService');

window.React = React; // export for http://fb.me/react-devtools

var socketService = new SocketService({
    hostname: 'localhost',
    port: 3000,
    path: '/feed'
});

React.render(
    <DashboardApp socketService={socketService} />,
    document.getElementById('react')
);
