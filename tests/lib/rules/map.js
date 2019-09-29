/**
 * @fileoverview lodash map to native map
 * @author Katherine
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ /*parserOptions: { ecmaVersion: 2015 }*/ });
ruleTester.run("map", rule, {

    valid: [
        "_.map({}, function(){})"
    ],

    invalid: [
        {
            code: "_.map([], function(){})",
            errors: [{
                messageId: 'mapError'
            }]
        },
        {
            code: "_.map(data, function(){})",
            errors: [{
                messageId: 'mapError'
            }]
        }
    ]
});
