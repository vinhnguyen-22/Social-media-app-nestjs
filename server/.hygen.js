module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    ControllerName(name) {
      return `${this.ClassName(name)}Controller`;
    },
    ModuleName(name) {
      return `${this.ClassName(name)}Module`;
    },
  },
};
