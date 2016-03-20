const gulp = require('gulp');
const typescript = require('gulp-typescript');
const concat = require('gulp-concat');
const eventStream = require('event-stream');
const SystemBuilder = require('systemjs-builder');
const sass = require('gulp-sass');
const ng2Templates = require('gulp-inline-ng2-template');

const app = 'app';
const dist = 'dist';
const node_modules = 'node_modules';
const typings = 'typings';

const paths = {
	scripts: {
		src: [
			app + '/**/*.ts',
			typings + '/main/**.ts'
		],
		concat: 'app.js',
		dest: dist + '/js'
	},
	libs: {
		src: [
			<!-- IE required polyfills, in this exact order -->
			node_modules + '/es6-shim/es6-shim.min.js',
			node_modules + '/systemjs/dist/system-polyfills.js',
			node_modules + '/angular2/es6/dev/src/testing/shims_for_IE.js',

			node_modules + '/angular2/bundles/angular2-polyfills.js',
			node_modules + '/rxjs/bundles/Rx.js',
			node_modules + '/angular2/bundles/angular2.dev.js',
			node_modules + '/angular2/bundles/router.dev.js'
		],
		concat: 'vendor.js',
		dest: dist + '/js'
	},
	templates: {
		src: app + '/**/*.html'
	},
	sass: {
		src: [ 
			'main.scss',
			app + '/**/*.scss'
		],
		concat: 'styles.css',
		dest: dist + '/css'
	},
	misc: [
		{
			src: app + '/index.html',
			dest: dist
		},
		{
			src: node_modules + '/systemjs/dist/system.src.js',
			dest: dist + '/js'
		}
	]
};

gulp.task('typescript', function () {
	const tsProject = typescript.createProject('tsconfig.json', {
		typescript: require('typescript'),
		sortOuput: true
	});

	return gulp.src(paths.scripts.src)
		.pipe(typescript(tsProject)).js
		.pipe(ng2Templates({ base: app }))
		.pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('scripts', ['typescript'], function () {
	var builder = new SystemBuilder(dist + '/js', {
		paths: {
			'*': '*.js'
		},
		meta: {
			'angular2/*': {
				build: false
			}
		}
	});

	return builder.bundle('main', dist + '/js/app.bundle.js');
});

gulp.task('libs', function () {
	return gulp.src(paths.libs.src)
		.pipe(concat(paths.libs.concat))
		.pipe(gulp.dest(paths.libs.dest))
});

gulp.task('styles', function () {
	return gulp.src(paths.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat(paths.sass.concat))
		.pipe(gulp.dest(paths.sass.dest));
});

gulp.task('misc', [], function () {
	return eventStream.merge.apply(null, paths.misc.map(function (item) {
		return gulp.src(item.src)
			// .pipe(gulpif(item.replace !== false, frep(envs[env])))
			.pipe(gulp.dest(item.dest));
	}));
});

gulp.task('watch', [], function () {
	[
		gulp.watch([ paths.scripts.src, paths.templates.src ], [ 'scripts' ]),
		gulp.watch([ paths.sass.src ], [ 'styles' ]),
		// gulp.watch(paths.images, [ 'images' ]),
		// gulp.watch(paths.fonts, [ 'fonts' ]),
		gulp.watch(paths.misc.map((item) => item.src), [ 'misc' ])
	].forEach(function (watch) {
		watch.on('change', function (event) {
			console.log('File %s was %s, running tasks...', event.path, event.type);
		});
	});
});

gulp.task('default', ['libs', 'scripts', 'styles', 'misc']);
