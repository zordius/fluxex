var React = require('react'),
    Fluxex = require('fluxex'),
    apis = require('../actions/api'),

Results = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['search']}
    ],

    componentDidMount: function() {
        /*global window,document*/
        window.addEventListener('scroll', this.handleScroll, false);
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll, false);
    },

    getStateFromStores: function () {
        return this.getStore('search').get('data');
    },

    handleScroll: function () {
        if (this.appending) {
            return;
        }
        if (window.pageYOffset + window.innerHeight * 3 > document.body.offsetHeight) {
            this.appending = true;
            this.executeAction(apis.load_more).then(function () {
                console.log('load more ok');
                this.appending = false;
            }).catch(function (E) {
                console.log('load more failed');
                console.log(E);
                this.appending = false;
            });
        }
    },

    render: function () {
        var videos = [], I, V,
            all = this.state.videos ? this.state.videos.length : 0,
            attr;

        if (!all) {
            return (
               <h1>Search keyword: '{this.state.keyword}' not found!</h1>
            );
        }

        for (I in this.state.videos) {
            V = this.state.videos[I];
            attr = {key: V.id};
            if (I == all - 5) {
                attr.ref = 'scrollTrigger';
                attr.className = 'trigger';
            }
            videos.push(
            <li {...attr}>
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
