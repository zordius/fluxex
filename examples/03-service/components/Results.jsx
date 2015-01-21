var React = require('react'),
    Fluxex = require('fluxex'),

Results = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['search']}
    ],

    getStateFromStores: function () {
        return this.getStore('search').getResult();
    },

    render: function () {
        var hits = [], I, P;

        if (!this.state.hits) {
            return (
               <h1>Search keyword: '{this.state.keyword}' not found!</h1>
            );
        }

        for (I in this.state.hits) {
            P = this.state.hits[I];

            hits.push(
            <li key={P.id}>
             <h5><a href={P.Url}>{P.Title}</a></h5>
             <ul>
              <li>Distance: {P.Distance}</li>
              <li>Rating: {P.Rating.AverageRating}</li>
              <li>Address: <a href={P.MapUrl}>{P.Address} {P.City} {P.State}</a></li>
             </ul>
            </li>
            );
        }

        return (
        <div>
         <h1>Search keyword: '{this.state.keyword}'</h1>
         <ul>{hits}</ul>
        </div>
        );
    }
});

module.exports = Results;
