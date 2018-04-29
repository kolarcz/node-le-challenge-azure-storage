const azure = require('azure-storage');

const defaultOptions = {
  connectionString: null,
  blobContainer: 'letsencrypt'
};

module.exports.create = (createOptions) => {
  const options = Object.assign({}, defaultOptions, createOptions);

  const handlers = {
    getOptions: () => options,

    set: (opts, domain, key, value, done) => {
      const azureBlobService = azure.createBlobService(opts.connectionString);
      azureBlobService.createBlockBlobFromText(opts.blobContainer, key, String(value), done);
    },

    get: (opts, domain, key, done) => {
      const azureBlobService = azure.createBlobService(opts.connectionString);
      azureBlobService.getBlobToText(opts.blobContainer, key, done);
    },

    remove: (opts, domain, key, done) => {
      const azureBlobService = azure.createBlobService(opts.connectionString);
      azureBlobService.deleteBlob(opts.blobContainer, key, done);
    }
  };

  return handlers;
};
