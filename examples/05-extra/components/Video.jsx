var React = require('react'),
    Fluxex = require('fluxex'),

Results = React.createClass({
    mixins: [
        Fluxex.mixin
    ],

    render: function () {
        return (
<iframe src={'http://www.youtube.com/embed/' + this.props.id} width="100%" height="300" />
        );
    }
});

module.exports = Results;
