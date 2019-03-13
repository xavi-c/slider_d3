import resolve from 'rollup-plugin-node-resolve';

export default [{
        input: 'js/main.js',
        output: {
            file: 'bundle.js',
            format: 'cjs'
        },
        plugins: [resolve({
            // pass custom options to the resolve plugin
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        })],
        // indicate which modules shold be treated as external
        //external: ['fallback']
    },
    {
        input: 'js/calculate.js',
        output: {
            file: 'js/tests/calculate.js',
            format: 'cjs'
        }
    }
];