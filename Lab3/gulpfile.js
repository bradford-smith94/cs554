/* Bradford Smith (bsmith8)
 * CS 554 Lab 3 gulpfile.js
 * 09/16/2017
 */

const gulp = require("gulp");
const gulpSASS = require("gulp-sass");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");

const sassFiles = [
    "./src/styles/variables.scss",
    "./src/styles/custom.scss"
];

const vendorJs = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./src/bootstrap-4.0.0-beta/dist/js/bootstrap.min.js"
];

gulp.task("sass", () => {
    gulp.src(sassFiles)
        .pipe(gulpSASS().on("error", gulpSASS.logError))
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(autoPrefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("js:vendor", () => {
    gulp.src(vendorJs)
        .pipe(concatenate("vendor.min.js"))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["sass", "js:vendor", "watch"]);
