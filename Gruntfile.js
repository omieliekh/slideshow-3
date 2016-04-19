module.exports = function(grunt) {

    // loading needed npm modules
    //grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // main config object
    grunt.initConfig({
        // task for watching on changed files
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less:dev'],
                options: {
                    debounceDelay: 1,
                    interrupt: true
                }
            },
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
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
        }
    });

    grunt.registerTask('default', [
        'less:dev',
        'watch'
    ]);
};