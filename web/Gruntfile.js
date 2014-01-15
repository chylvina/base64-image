// Generated on 2013-09-03 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        doc: 'doc',
        tmp: '.tmp',
        dist: 'dist',
        test: 'test',
        port: {
            server: 9000,
            demo: 8888,
            test: 9001,
            doc: 9002
        }
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    }
    catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,

        watch: {
            scripts: {
                files: ['<%= yeoman.app %>/scripts/*.js', '<%= yeoman.app %>/scripts/**/*.js'],
                tasks: []
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            html: {
                files: ['<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/views/**/*.html'],
                tasks: ['html2js']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.tmp %>/styles/{,*/}*.css',
                    '{<%= yeoman.tmp %>, <%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            doc: {
                files: ['<%= yeoman.app %>/scripts/*.js', '<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['clean:doc', 'ngdocs']
            }
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.tmp %>/styles/',
                        src: '{,*/}*.css',
                        dest: '<%= yeoman.tmp %>/styles/'
                    }
                ]
            }
        },
        connect: {
            options: {
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    port: '<%= yeoman.port.server %>',
                    base: [
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.test %>',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: '<%= yeoman.port.test %>',
                    base: [
                        '<%= yeoman.tmp %>',
                        '<%= yeoman.test %>',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            },
            doc: {
                options: {
                    port: '<%= yeoman.port.doc %>',
                    base: [
                        '<%= yeoman.doc %>'
                    ]
                }
            },
            demo: {
                options: {
                    keepalive: true,
                    port: '<%= yeoman.port.demo %>',
                    base: [
                        '<%= yeoman.dist %>',
                        '<%= yeoman.test %>'
                    ]
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= yeoman.port.server %>'
            },
            doc: {
                url: 'http://localhost:<%= yeoman.port.doc %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.tmp %>',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '<%= yeoman.tmp %>',
            doc: '<%= yeoman.doc %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        html2js: {
            dist: {
                options: {
                    module: 'app.templates', // no bundle module for all the html2js templates
                    base: 'app'
                },
                src: ['<%= yeoman.app %>/views/*.html', '<%= yeoman.app %>/views/**/*.html'],
                dest: '<%= yeoman.tmp %>/scripts/app.templates.js'
            }
        },
        "merge-conflict": {
            files: [
                '<%= yeoman.app %>/views/**/*',
                '<%= yeoman.app %>/scripts/**/*',
                '<%= yeoman.app %>/styles/**/*'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '<%= yeoman.tmp %>/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.test %>/spec',
                        src: '{,*/}*.coffee',
                        dest: '<%= yeoman.tmp %>/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        less: {
            compile: {
                options: {
                    paths: ['<%= yeoman.app %>/styles'],
                    report: 'min'
                },
                files: {
                    '<%= yeoman.tmp %>/styles/aleutian.css': '<%= yeoman.app %>/less/aleutian.less'
                }
            }
        },
        ngdocs: {
            options: {
                dest: 'doc',
                scripts: [
                    'angular.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.color.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.codec.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.date.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.email.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.string.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.file.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.format.js',
                    '<%= yeoman.app %>/scripts/filter/app.filter.regex.js'


                ],
                html5Mode: true,
                startPage: '/api',
                title: "Documentation",
                //image: "path/to/my/image.png",
                //imageLink: "http://my-domain.com",
                titleLink: "/api",
                bestMatch: true
            },
            all: {
                src: [
                    '<%= yeoman.app %>/scripts/*.js',
                    '<%= yeoman.app %>/scripts/**/*.js'
                ],
                title: 'API Documentation'
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        uglify: {
            options: {
                mangle: false
            }
        },
        // concat: {
        //   dist: {}
        // },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        protractor: {
            options: {
                configFile: "protractor.conf.js", // Target-specific config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                args: {
                    // Arguments passed to the command
                }
            },
            test: {
                configFile: "protractor.conf.js", // Target-specific config file
                options: {
                    args: {} // Target-specific arguments
                }
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            'images/**/*',
                            'index.html',
                            'bower_components/**/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '<%= yeoman.tmp %>/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'html2js',
                'coffee:dist',
                'less',
                'copy:styles'
            ],
            test: [
                'html2js',
                'coffee',
                'less',
                'copy:styles'
            ],
            dist: [
                'html2js',
                //'coffee',
                'less',
                'copy:styles'//,
                //'svgmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.tmp %>/concat/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.tmp %>/concat/scripts'
                }]
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            //'autoprefixer',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        //'clean:server',
        //'concurrent:test',
        //'autoprefixer',
        //'connect:test',
        'karma'
    ]);

    grunt.registerTask('doc', [
        'clean:doc',
        'ngdocs',
        'connect:doc',
        'open:doc',
        'watch:doc'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('demo', [
        'build',

        'connect:demo'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
