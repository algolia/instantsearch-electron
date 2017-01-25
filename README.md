# instant-search-electron

> A boilerplate for building a desktop React InstantSearch app with Electron

Based on the excellent [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) project, which includes support for hot reloading in dev all the way to releases and auto-updates.

## Install

First, clone the repo via git:

```bash
git clone https://github.com/algolia/instant-search-electron.git your-project-name
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
