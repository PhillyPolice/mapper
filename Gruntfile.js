module.exports = function (grunt) {

	var appConfig = {
		dev: 'app',
		prod: 'dist',
		port: 3000
	};

	grunt.initConfig({
		app: appConfig,
		aws: grunt.file.readJSON('aws.json'),
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			compass: {
				files: ['<%= app.dev %>/styles/*.{scss,sass}'],
				tasks: ['compass']
			},
			express: {
				files: ['app.js'],
				tasks: ['express:dev']
			}
		},
		open: {
			dev: {
				path: 'http://localhost:<%= app.port %>'
			}
		},
		jshint: {
			all: ['Gruntfile.js', '<%= app.dev %>/scripts/*.js', '<%= app.dev %>/scripts/**/*.js', 'test/*.js', '!<%= app.dev %>/scripts/vendor/**/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		mocha: {
			dev: {
				src: ['testrunner.html'],
				run: false,
				options: {
					log: true,
					reporter: 'Spec'
				}
			}
		},
		clean: {
			hooks: ['.git/hooks/pre-commit']
		},
		shell: {
			hooks: {
				command: 'chmod +x git-hooks/pre-commit; cp git-hooks/pre-commit .git/hooks/'
			}
		},
		compass: {
			dev: {
				options: {
					cssDir: '<%= app.dev %>/styles',
					sassDir: '<%= app.dev %>/styles',
					imagesDir: '<%= app.dev %>/images',
					javascriptsDir: '<%= app.dev %>/scripts',
					force: true
				}
			}
		},
		express: {
			options: {
				background: true
			},
			dev: {
				options: {
					script: 'app.js'
				}
			}
		},
		s3: {
			options: {
				key: '<%= aws.key %>',
				secret: '<%= aws.secret %>',
				bucket: '<%= aws.bucket %>',
				access: 'public-read'
			},
			prod: {
				upload: [
					{
						src: '<%= app.dev %>/scripts/collections/*',
						dest: 'scripts/collections'
					},
					{
						src: '<%= app.dev %>/scripts/models/*',
						dest: 'scripts/models'
					},
					{
						src: '<%= app.dev %>/scripts/templates/*',
						dest: 'scripts/templates'
					},
					{
						src: '<%= app.dev %>/scripts/views/*',
						dest: 'scripts/views'
					},
					{
						src: '<%= app.dev %>/scripts/app.js',
						dest: 'scripts/app.js'
					},
					{
						src: '<%= app.dev %>/scripts/router.js',
						dest: 'scripts/router.js'
					},
					{
						src: '<%= app.dev %>/scripts/main.js',
						dest: 'scripts/main.js'
					},
					{
						src: '<%= app.dev %>/index.html',
						dest: 'index.html'
					},
					{
						src: '<%= app.dev %>/styles/main.css',
						dest: 'styles/main.css'
					}
				]
			}
		}
	});

	grunt.registerTask('server', ['express:dev','open:dev','watch']);
	grunt.registerTask('test', ['jshint','mocha:dev']);
	grunt.registerTask('deploy', ['s3']);
	grunt.registerTask('loadhook', ['clean:hooks', 'shell:hooks']);

	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-s3');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-livereload');
};