const sass = require("node-sass");

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          "src/css/alertmanager.dark.css": "src/sass/alertmanager.dark.scss",
          "src/css/alertmanager.light.css": "src/sass/alertmanager.light.scss"
        }
      }
    }
  });

  grunt.registerTask("default", ["sass"]);
};
