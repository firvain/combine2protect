module.exports = {
  lintOnSave: true,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],

  pluginOptions: {
    i18n: {
      locale: "gb",
      fallbackLocale: "bg",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
