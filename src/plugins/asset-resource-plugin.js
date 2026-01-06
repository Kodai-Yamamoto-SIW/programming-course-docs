module.exports = function assetResourcePlugin() {
  return {
    name: 'asset-resource-plugin',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.(txt|html|zip)$/i,
              type: 'asset/resource',
            },
          ],
        },
      };
    },
  };
};

