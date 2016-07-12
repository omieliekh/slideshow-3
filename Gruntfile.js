module.exports = function(grunt) {

    // loading needed npm modules
    //grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.initConfig({
        watch: {
            server: {
                files: ['server.js', 'middlewares/*.js'],
                tasks:  ['express:dev'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['**/*.less'],
                tasks: ['less:dev'],
                options: {
                    interrupt: true

                }
            }
        },

        less: {
            dev:{
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 1
                },
                files: {
                    "css/main.css": "less/main.less" // destination file and source file
                }
            }
        },

        express: {
            options: {
                port: 8333
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'less:dev',
        'express:dev',
        'watch'
    ]);
};