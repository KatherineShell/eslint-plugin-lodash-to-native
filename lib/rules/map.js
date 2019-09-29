/**
 * @fileoverview lodash map to native map
 * @author Katherine
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


module.exports = {
    meta: {
        messages: {
            mapError: 'You can replace lodash map to native'
        },
        docs: {
            description: "lodash map to native map",
            category: "Fill me in",
            recommended: false
        },
        fixable: "code",
        schema: []
    },
    create: function (context) {
        const types = {
            condition: 'ConditionalExpression',
            array: 'ArrayExpression',
            object: 'ObjectExpression'
        };
        
        return {
            CallExpression(node) {
                let call = node.callee;

                if (call) {
                    let { object, property } = call;

                    if (object && object.name === '_') {
                        if (property && property.name === 'map') {
                            let params = node.arguments;

                            if (params.length === 2) {
                                let arr = params[0];
                                let fn = params[1];
                                
                                if (params[0].type === types.array) {

                                    context.report({
                                        node,
                                        messageId:'mapError',
                                        fix(fixer) {
                                            let sourceCode = context.getSourceCode();

                                            return [
                                                fixer.replaceTextRange([node.start, node.end],
                                                    sourceCode.getText(arr) + '.map(' + sourceCode.getText(fn) + ')')
                                            ];
                                        }
                                    })
                                }
                                else if (params[0].type !== types.object) {
                                    context.report({
                                        node,
                                        messageId:'mapError',
                                        fix(fixer) {
                                            let sourceCode = context.getSourceCode();
                                            let acestors = context.getAncestors();
                                            let cuurentSourceCode = sourceCode.getText(node);
                                            let currentArray = sourceCode.getText(arr);

                                            if (acestors[acestors.length - 1].type === types.condition) {
                                                return;
                                            }

                                            return [
                                                fixer.replaceTextRange([node.start, node.end],
                                                    'Array.isArray(' + currentArray + ')?' +
                                                    currentArray + '.map(' + sourceCode.getText(fn) + '):'
                                                    + cuurentSourceCode)
                                            ];
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        };
    }
};
