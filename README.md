# le-challenge-azure-storage

A challenge strategy for [greenlock.js](https://www.npmjs.com/package/greenlock) ([node-letsencrypt](https://www.npmjs.com/package/letsencrypt)) for setting, retrieving, and clearing ACME challenges by azure-storage as blobs.

It is designed to handle `http-01` challenges.

## Install

```bash
npm install --save le-challenge-azure-storage
```

## Usage

```javascript
const challenge = require('le-challenge-azure-storage').create({
  connectionString: 'DefaultEndpointsProtocol=https;AccountName=xxxxx...',
  blobContainer: 'letsencrypt'
});

const LE = require('greenlock');

LE.create({
  ...
  challengeType: 'http-01',
  challenge,
  ...
});

LE.register(...);
```

It requires the `challengeType` option to `greenlock` to be
`http-01`.

## Exposed Methods

For ACME Challenge:

* `set(opts, domain, key, value, done)`
* `get(opts, domain, key, done)`
* `remove(opts, domain, key, done)`

For greenlock.js (node-letsencrypt) internals:

* `getOptions()` returns the user supplied options, if any (no effect)
