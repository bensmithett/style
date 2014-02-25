var gulp = require("gulp"),
    compass = require("gulp-compass"),
    autoprefixer = require("gulp-autoprefixer");

var stylesheets = ["./stylesheets/application.sass", "./stylesheets/application-fixed.sass", "./stylesheets/application-lt-ie9.sass"];

gulp.task("default", function() {
  gulp.src(stylesheets)
      .pipe(compass({
        config_file: "./config.rb",
        css: "css",
        sass: "stylesheets"
      }))
      .pipe(autoprefixer("> 1%", "last 2 versions", "Firefox ESR", "Explorer 9"))
      .pipe(gulp.dest("css"));
});

gulp.task("watch", function() {
  gulp.watch("./stylesheets/**/*", ["default"]);
});
