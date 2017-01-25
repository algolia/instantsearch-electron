# instantsearch-electron

**A boilerplate for building a desktop React InstantSearch app with Electron**

This boilerplate includes everything you need to create an instant search experience that runs as a native desktop application. It combines the power of [React InstantSearch](https://community.algolia.com/instantsearch.js/react/) with [Electron](http://electron.atom.io/), as well as several other hand-picked technologies to make desktop app development a breeze.

![Screenshot of an instantsearch-electron app](https://dl.dropboxusercontent.com/s/v2myrfdu0ugev31/Screenshot%202017-01-25%2013.37.12.png)
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

## Photon Kit

This boilerplate includes styles and icon fonts from the excellent [Photon](http://photonkit.com/) project. Photon's HTML and CSS helps make your Electron app look and feel native. You can find the Photon components in the `app/assets/photon` folder of the boilerplate.
