const { removePlugins, pluginByName } = require("@craco/craco");

const customCracoConfigPlugin = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    if (pluginOptions.preText) {
      console.log(pluginOptions.preText);
    }

    removePlugins(webpackConfig, pluginByName("ModuleScopePlugin"));
    console.log(JSON.stringify(webpackConfig));
    return webpackConfig;
  },
};

module.exports = {
  plugins: [
    {
      plugin: customCracoConfigPlugin,
      options: { preText: "Will log the craco config:" },
    },
  ],
};
