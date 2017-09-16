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

gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["sass", "watch"]);
