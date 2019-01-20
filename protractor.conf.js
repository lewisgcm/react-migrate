require('ts-node').register();

exports.config = {
    baseUrl: 'http://localhost:9000',
    specs: [
        'e2e/features/**/*.feature'
    ],
    exclude: [],
    framework: 'custom',
    frameworkPath: require.resolve( 'protractor-cucumber-framework' ),
    cucumberOpts: {
        require: [ 'e2e/steps/**/*.ts' ],
    },
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: [ "--headless" ]
        }
    },
}
