'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: ['app/views/**'],
                options: {
                    livereload: true,
                }
            },
            serverJS: {
                files: ['Gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                }
            },
            express: {
                files: [
                    'server.js',
                    'config/**/*.js',
                    'app/**/*.js'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
            clientViews: {
                files: ['public/modules/**/views/*.html'],
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: ['public/js/**/*.js', 'public/modules/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                }
            },
            clientCSS: {
                files: ['public/**/css/*.css'],
                options: {
                    livereload: true,
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
        jshint: {
            all: {
                src: ['Gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/**/*.js', 'public/modules/**/*.js'],
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                }
            }
        },
        express: {
            options: {
                port: process.env.PORT || 3000,
                script: 'server.js'
            },
            dev: {
                tasks: ['env:development']
            },
            prod: {
                tasks: ['env:production']
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            development: {
                NODE_ENV: 'development'
            },
            production: {
                NODE_ENV: 'production'
            }
        },
        mochaTest: {
            src: ['app/tests/**/*.js'],
            options: {
                reporter: 'spec',
                require: 'server.js'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['express:prod', 'open', 'express-keepalive']);
        }

        grunt.task.run([
            'express:dev',
            'open',
            'watch'
        ]);
    });

    // Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
