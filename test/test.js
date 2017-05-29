"use strict";
/// <reference path="../defs/tsd.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var grunt = require('grunt');
var utils = require("../tasks/modules/utils");
var _ = require("lodash");
function testFile(test, path, whitespaceDifferencesOK) {
    if (whitespaceDifferencesOK === void 0) { whitespaceDifferencesOK = false; }
    var actualFileName = 'test/' + path, expectedFileName = 'test/expected/' + path;
    var actual = grunt.file.read(actualFileName);
    var expected = grunt.file.read(expectedFileName);
    if (whitespaceDifferencesOK) {
        actual = actual.replace(/\s/g, '');
        expected = expected.replace(/\s/g, '');
    }
    test.equal(expected, actual, "Actual did not match expected.  Run this to compare:" +
        (grunt.util.linefeed + "kdiff3 \"" + actualFileName + "\" \"" + expectedFileName + "\""));
}
function assertFileDoesNotExist(test, path) {
    var exists = grunt.file.exists(path);
    test.equal(false, exists, 'Expected this file to not exist: ' + path);
}
function testExpectedFile(test, path, whitespaceDifferencesOK) {
    if (whitespaceDifferencesOK === void 0) { whitespaceDifferencesOK = false; }
    var actualFileName = path.replace('\\expected', '').replace('/expected', ''), expectedFileName = path;
    var actual = grunt.file.read(actualFileName);
    var expected = grunt.file.read(expectedFileName);
    if (whitespaceDifferencesOK) {
        actual = actual.replace(/\s/g, '');
        expected = expected.replace(/\s/g, '');
    }
    test.equal(expected, actual, "Actual did not match expected.  Run this to compare:" +
        (grunt.util.linefeed + "kdiff3 \"" + actualFileName + "\" \"" + expectedFileName + "\""));
}
function testDirectory(test, folder, whitespaceDifferencesOK) {
    if (whitespaceDifferencesOK === void 0) { whitespaceDifferencesOK = false; }
    var files = utils.getFiles(('test/expected/' + folder));
    _.forEach(files, function (expected) {
        testExpectedFile(test, expected, whitespaceDifferencesOK);
    });
}
exports.tests = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    simple: function (test) {
        testFile(test, 'simple/js/zoo.js', true);
        testFile(test, 'simple/js/zoo.d.ts');
        test.done();
    },
    simple_with_rootDir: function (test) {
        testDirectory(test, 'simple_with_rootDir');
        test.done();
    },
    abtest: function (test) {
        testFile(test, 'abtest/reference.ts');
        testFile(test, 'abtest/out.js', true);
        test.done();
    },
    allowJs: function (test) {
        testDirectory(test, 'allowJs');
        test.done();
    },
    amdloader: function (test) {
        testDirectory(test, 'amdloader');
        test.done();
    },
    templateCache: function (test) {
        testDirectory(test, 'templateCache');
        test.done();
    },
    html2ts: function (test) {
        testDirectory(test, 'html');
        testDirectory(test, 'htmlTemplate');
        testDirectory(test, 'htmlSnakeModuleName');
        test.done();
    },
    index: function (test) {
        testDirectory(test, 'index');
        test.done();
    },
    transform: function (test) {
        testDirectory(test, 'transform', true);
        test.done();
    },
    referencesTransform: function (test) {
        testDirectory(test, 'references-transform');
        test.done();
    },
    customcompiler: function (test) {
        testDirectory(test, 'customcompiler');
        test.done();
    },
    fail: function (test) {
        testDirectory(test, 'fail'); // tested to make sure transformers still run for failing task
        test.done();
    },
    es6: function (test) {
        testDirectory(test, 'es6');
        test.done();
    },
    noEmitOnError: function (test) {
        testDirectory(test, 'noEmitOnError');
        assertFileDoesNotExist(test, 'test/noEmitOnError/testNoEmitOnError_true.js');
        test.done();
    },
    preserveConstEnums: function (test) {
        testDirectory(test, 'preserveConstEnums');
        test.done();
    },
    suppressImplicitAnyIndexErrors: function (test) {
        testDirectory(test, 'suppressImplicitAnyIndexErrors');
        assertFileDoesNotExist(test, 'test/suppressImplicitAnyIndexErrors/test_suppressImplicitAnyIndexError_false.js');
        test.done();
    },
    varReplacedTest: function (test) {
        testDirectory(test, 'varreplacedtest');
        test.done();
    },
    vsproj_test_ignoreSettings: function (test) {
        testDirectory(test, 'vsproj/ignoreSettings');
        test.done();
    },
    files_ObjectFormat: function (test) {
        testDirectory(test, 'files_ObjectFormat', true);
        test.done();
    },
    out_and_outdir_with_spaces: function (test) {
        testDirectory(test, 'out with spaces');
        test.done();
    },
    htmlExternal: function (test) {
        testDirectory(test, 'htmlExternal');
        test.done();
    },
    nestedSources: function (test) {
        testDirectory(test, 'nestedSources');
        test.done();
    }
};
//# sourceMappingURL=test.js.map