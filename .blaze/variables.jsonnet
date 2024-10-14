local blaze = std.extVar('blaze');

{
    // global workspace variables, can be overriden with other files (see the `include` key below), or through the CLI. 
    vars: {
        lint: {
            fix: false
        },
        migrations: {
            name: null
        }
    },
    // you can add more variables files in this array, if needed.
    include: [
        {
            path: blaze['root'] + '/user-variables.jsonnet',
            optional: true
        }
    ]
}
