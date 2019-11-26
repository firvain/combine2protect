module.exports = {
  lintOnSave: true,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: "gb",
      fallbackLocale: "gb",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
