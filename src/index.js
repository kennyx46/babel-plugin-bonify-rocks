"use strict";

module.exports = function ({ types: t }) {
    return {
        name: "babel-plugin-bonify-rocks",
        visitor: {
            CallExpression(path, state) {
                const callee = path.get("callee");

                if (!callee.isMemberExpression()) return;

                if (isConsole(callee.get("object"))) {
                    const prepend = t.stringLiteral("Bonify rocks");
                    const expression = t.binaryExpression('+', prepend, path.get('arguments')[0].node);
                    path.node.arguments[0] = expression;
                }
            }
        }
    };

    function isConsole(id) {
        const name = "console";
        return (
            id.isIdentifier({ name }) &&
            !id.scope.getBinding(name) &&
            id.scope.hasGlobal(name)
        );
    }

};