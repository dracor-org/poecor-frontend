# PoeCor Frontend

The web interface of PoeCor ("Poetry Corpora"): a limited, [DraCor](https://dracor.org)-like view of poetic corpora from the [POSTDATA](https://postdata.linhd.uned.es) project (ERC Starting Grant 2015, grant agreement No. 679528; LINHD, UNED Madrid).

> **Archived.** This repository is no longer maintained. It was deployed at poecor.org, which was shut down in November 2026.

## Background

PoeCor goes back to a demonstrator developed in [CLS INFRA](https://clsinfra.io) (Horizon 2020, grant agreement No. 101004984), work package 7, and described in section 6.2, "Bridging POSTDATA and DraCor as Programmable Corpora", of the report:

- Börner, Ingo; Trilcke, Peer (2023): *On Programmable Corpora*. CLS INFRA D7.1. Zenodo. https://doi.org/10.5281/zenodo.7664964

The frontend lists the corpora, the poems of a corpus and, for a single poem, its metadata and the results of POSTDATA's automatic analysis. It was written to consume the [PoeCor API](https://github.com/dracor-org/poecor-api) (`/api`), but runs on mock data served by a [mock service worker](https://mswjs.io) (`src/mocks/`). As the report notes, the deployed version operated on mock data pre-generated with a Jupyter notebook in [dh-network/postdata-2-dracor-api](https://github.com/dh-network/postdata-2-dracor-api).

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com)

### Getting started

To start working on *poecor-frontend* or to just check it out run the following
commands:

```sh
git clone git@github.com:dracor-org/poecor-frontend.git
cd poecor-frontend
yarn start
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Run `eslint ./src`.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn version`

Changes the version number in `package.json`, commits the changes, creates a tag
and pushes the commit and the tag to the `origin` remote. To make sure only
correct code is being tagged, a `preversion` script also runs `yarn test` and
`yarn build` before  actually bumping the version.

By default you will be asked to enter a new version number. With the commands
`yarn version --patch`, `yarn version --minor`, or `yarn version --major` the
respective part of the version number is incremented automatically. (See the
[yarn documentation](https://classic.yarnpkg.com/en/docs/cli/version/) for
details.)

## Citation

See `CITATION.cff`. The software is archived on Zenodo (see the DOI in the repository description and the release `2026-11-16-archive`). When referring to the work, please also cite the report (DOI above).

## Licence

The code is licensed under the [MIT License](LICENSE).
