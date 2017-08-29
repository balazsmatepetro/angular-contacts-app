module.exports = function (grunt) {
    const SOURCE_FILES = 'src/**/*.js';
    const TEMPLATES_FILE = 'dist/templates.js';
    
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/app.js': [
                        SOURCE_FILES,
                        TEMPLATES_FILE
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
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            sources: [
                SOURCE_FILES
            ]
        },
        ngtemplates: {
            app: {
                src: 'src/**/*.html',
                dest: TEMPLATES_FILE
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('dev', [
        'eslint',
        'ngtemplates',
        'browserify',
        'sass'
    ]);
};
