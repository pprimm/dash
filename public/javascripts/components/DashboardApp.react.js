/**
 *
 */

var React = require('react');
var MemoryUsageGraph = require('./MemoryUsageGraph.react');

var DashboardApp = React.createClass({

    getInitialState: function () {
        return {data: {}};
    },

    componentDidMount: function () {
        this.requestData();
    },

    render: function() {
        return (
            <div className="dashboardapp">
                <MemoryUsageGraph data={this.state.data.rss} title="Resources" label="Mem" max={100} />
                <MemoryUsageGraph data={this.state.data.heapTotal} title="Heap Total" label="Mem" max={100} />
                <MemoryUsageGraph data={this.state.data.heapUsed} title="Heap Used" label="Mem" max={100} />
            </div>
        );
    },

    requestData: function () {

        this.setState({data: {}});

        var socket = this.props.socketService;

        socket.onStatsReceived(function (stats) {
            this.setState({data: stats});
        }.bind(this));
    }

});

module.exports = DashboardApp;
