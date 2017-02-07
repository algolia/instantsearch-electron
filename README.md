# instantsearch-electron

**A boilerplate for building desktop React InstantSearch apps with Electron**

This boilerplate includes everything you need to create an instant search experience that runs as a native desktop application. It combines the power of [React InstantSearch](https://community.algolia.com/instantsearch.js/react/) with [Electron](http://electron.atom.io/), as well as several other hand-picked technologies that make desktop app development a breeze.

![Screenshot of an instantsearch-electron app](https://d17oy1vhnax1f7.cloudfront.net/items/2X140E1T2A001i2r3i0h/Screenshot%202017-02-07%2011.16.22.png)
*The example application, a search for quotes faceted by nationality and author*

[React InstantSearch](https://community.algolia.com/instantsearch.js/react/) is a set of components and patterns for building a powerful search experience that includes facets, filters, pagination and many other refinements. React InstantSearch is an [Algolia Community](https://community.algolia.com/) project with official support from [Algolia](https://algolia.com).

This project is based on the excellent [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) project, which includes support for hot reloading in dev all the way to releases and auto-updates. For information about how to work with this boilerplate in detail, please see the [electron-react-boilerplate README](https://github.com/chentsulin/electron-react-boilerplate). Except for some basics, the documentation in this README will be focused on the modifications to the boilerplate to add React InstantSearch functionality.

## Install

First, clone the repo via git:

```bash
git clone https://github.com/algolia/instantsearch-electron.git your-project-name
```

And then install dependencies.
**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation

```bash
$ cd your-project-name && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

You will find the created app in the `release` directory.

To run a non-development build of the app without packaging run:

```bash
$ npm run build
$ npm start
```

## Features

+ Window position and size are remembered between restarts.
+ The state of the search is remembered between restarts. This is done by saving the URL of the Chromium window each time a search state change is published. The goal of remembering state is to have an opening and closing experience that is seamless to the user and feels native.
+ The example app, a search for famous quotes, contains a search box, 2 refinement lists for faceting, and a custom template for rendering hits. There are many more [React InstantSearch widgets](https://community.algolia.com/instantsearch.js/react/widgets/InstantSearch.html) available.

## Customization

React InstantSearch uses an Algolia index as its data source. You will want to change some parameters in the boilerplate to point to the index you'd like to search. You will need to have created an Algolia account and the index in advance, which you can do right now via [algolia.com](https://algolia.com).

Replace these params in the `Search.js` file with your specific data.

``` js
const algoliaAppId = '<my-app-id>';
const algoliaIndexName = '<my-index-name>';
const algoliaAPIKey = '<my-api-key>';
```

Then, be sure to change the properties of the `<Hits/>` widget and `<RefinementList />` widget(s) to match the relevant attributes of your data model.

This is the Hit template for the example quotes app. For your app you will modify this to display the results as you like.

``` jsx
const Hit = ({ hit }) =>
  <div className="hit">
    <div className="quote-text">
      "<Highlight attributeName="quote" hit={hit} />"
    </div>
    <div className="additional-info">
      <div className="author"><Highlight attributeName="author" hit={hit} /></div>
      <div>{hit.nationality}</div>
      <div>{hit.deathDate || hit.deathDate}</div>
      <div className="keywords"><Highlight attributeName="keywords" hit={hit} /></div>
    </div>
  </div>;
```

## Source Code

The primary logic for the search is in [app/components/Search.js](app/components/Search.js). The render method looks like this:

``` jsx
render() {
    return (
      <InstantSearch
        appId={algoliaAppId} apiKey={algoliaAPIKey} indexName={algoliaIndexName}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
        createURL={this.createURL.bind(this)}
      >
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <div className="pane-sm sidebar">
                <ul className="list-group">
                  <li className="list-group-header">
                    <SearchBox translations={{ placeholder: 'Search...' }} />
                  </li>
                  <li className="list-group-item">
                    <RefinementList attributeName="nationality" />
                  </li>
                  <li className="list-group-item">
                    <RefinementList attributeName="author" />
                  </li>
                  <div className="ais-PoweredBy__root">
                    Powered by Algolia
                  </div>
                </ul>
              </div>
              <div className="pane">
                <header className="toolbar toolbar-header">
                  <div className="toolbar-actions">
                    <ClearAll />
                  </div>
                </header>
                <div className="after-header">
                  <div className="hits">
                    <Hits hitComponent={Hit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
```

The primary CSS file is at [app/app.global.css](app/app.global.css).


## Photon Kit

This boilerplate includes styles and icon fonts from the excellent [Photon](http://photonkit.com/) project. Photon's HTML and CSS helps make your Electron app look and feel native. You can find the Photon components in the [app/assets/photon](app/assets/photon) folder of the boilerplate.

## Contributing

