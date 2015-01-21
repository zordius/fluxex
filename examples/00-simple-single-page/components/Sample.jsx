var React = require('react'),
    Fluxex = require('fluxex'),

Sample = React.createClass({
    mixins: [
        Fluxex.mixin,
        {listenStores: ['sampleStore']}
    ],

    getStateFromStores: function () {
        return {c: this.getStore('sampleStore')._get('c')};
    },

    getInitialState: function () {
        return this.getStateFromStores();
    },

    onStoreChange: function () {
        this.setState(this.getStateFromStores());
    },

    UpdateSampleToOne: function () {
        // Dirty way without action creator, do not do it
        this._getContext().dispatch('UPDATE_SAMPLE', 1);
    },

    UpdateSampleToTen: function () {
        // Dirty way without action creator, do not do it
        this._getContext().dispatch('UPDATE_SAMPLE', 10);
    },

    render: function () {
        return (
        <div>
         <div>{'Dump sample data: ' + this.state.c}</div>
         <hr/>
         <button onClick={this.UpdateSampleToOne}>Set to 1</button>
         <button onClick={this.UpdateSampleToTen}>Set to 10</button>
        </div>
        );
    }
});

module.exports = Sample;
