var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var applyFeatureFlags = require('../src/index');

function testFixture(name, plugins) {
    it(name, function () {
        var actualPath = path.resolve(__dirname, 'fixtures', name, 'actual.js');
        var expectedPath = path.resolve(__dirname, 'fixtures', name, 'expected.js');

        var expected = fs.readFileSync(expectedPath).toString();
        var result = babel.transformFileSync(actualPath, { plugins: plugins });

        assert.strictEqual(result.code, expected);
    });
}

describe('babel-plugin-bonify-rocks', function () {
    // describe('basic', function () {
        var plugins = [
            [applyFeatureFlags, {
                import: {
                    module: 'features'
                },
                features: {
                    enabled: 'enabled',
                    disabled: 'disabled',
                    dynamic: 'dynamic'
                }
            }]
        ];

        testFixture("basic", plugins);
        testFixture("variable", plugins)
    // });
});