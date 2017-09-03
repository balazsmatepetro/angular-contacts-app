module.exports = function (grunt) {
    const DIST_PATH = 'dist';
    const JS_SOURCE_FILES = 'src/**/*.js';
    const JS_TEMPLATES_FILE = `${DIST_PATH}/js/templates.js`;
    
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/js/app.js': [
                        JS_SOURCE_FILES,
                        JS_TEMPLATES_FILE
                    ]
                },
                options: {
                    transform: [['babelify', {
                        presets: "es2015"
                    }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        clean: {
            dist: ['dist']
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            sources: [
                JS_SOURCE_FILES
            ]
        },
        ngtemplates: {
            app: {
                src: 'src/**/*.html',
                dest: JS_TEMPLATES_FILE
            }
        },
        sass: {
            'app': {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'scss/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('dev', [
        'eslint',
        'clean',
        'ngtemplates',
        'browserify',
        'sass'
    ]);
};
