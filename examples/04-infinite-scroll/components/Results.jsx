var React = require('react'),
    Fluxex = require('fluxex'),

Results = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['search']}
    ],

    getStateFromStores: function () {
        return this.getStore('search').get('data');
    },

    render: function () {
        var videos = [], I, V;

        if (!this.state.videos) {
            return (
               <h1>Search keyword: '{this.state.keyword}' not found!</h1>
            );
        }

        for (I in this.state.videos) {
            V = this.state.videos[I];

            videos.push(
            <li key={V.id}>
             <h5><a href={V.url}>{V.title}</a></h5>
             <a href={V.url}><img src={V.thumbnails.thumbnail[0].content}/>{V.duration+' seconds'}</a>
            </li>
            );
        }

        return (
        <div>
         <h1>Search keyword: '{this.state.keyword}'</h1>
         <ul>{videos}</ul>
        </div>
        );
    }
});

module.exports = Results;
