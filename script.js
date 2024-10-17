// Define the Node structure for AST
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

// Array to hold the rules as AST
let rules = [];

// Create an AST from a rule string
function createRule() {
    const ruleString = document.getElementById('ruleInput').value.trim();
    if (!ruleString) {
        alert("Please enter a valid rule.");
        return;
    }

    const ruleAst = parseRule(ruleString); // Convert rule string to AST
    if (ruleAst) {
        rules.push(ruleAst);
        document.getElementById('rulesList').innerHTML += `<li>${ruleString}</li>`;
        document.getElementById('ruleInput').value = ''; // Clear input
    }
}

// Parse the rule string and return an AST
function parseRule(ruleString) {
    const parts = ruleString.split(/\sAND\s|\sOR\s/);
    let operator = ruleString.includes('AND') ? 'AND' : 'OR';
    let left = parseCondition(parts[0]);
    let right = parseCondition(parts[1]);
    return new Node("operator", left, right, operator);
}

// Parse individual condition from a rule string
function parseCondition(condition) {
    const [key, operator, value] = condition.split(/\s+/);
    return new Node("operand", null, null, { key, operator, value });
}

// Combine all rules into a single AST
function combineRules() {
    if (rules.length < 2) {
        alert("Need at least two rules to combine.");
        return;
    }
    let combined = rules.reduce((combinedAst, rule) => {
        return new Node("operator", combinedAst, rule, "AND");
    });
    console.log("Combined AST: ", combined);
    alert("Rules combined successfully.");
}

// Evaluate the combined AST against user data
function evaluateRules() {
    const userDataInput = document.getElementById('userData').value.trim();
    let userData;

    try {
        userData = JSON.parse(userDataInput);
    } catch (e) {
        alert("Invalid JSON format. Please enter valid JSON data.");
        return;
    }

    const result = rules.map(rule => evaluateRule(rule, userData));
    document.getElementById('result').innerHTML = result.join('<br>');
}

// Evaluate an individual rule (AST) against the user data
function evaluateRule(node, data) {
    if (node.type === "operand") {
        const { key, operator, value } = node.value;
        const userValue = data[key];
        let result;

        switch (operator) {
            case '>':
                result = userValue > parseInt(value);
                break;
            case '<':
                result = userValue < parseInt(value);
                break;
            case '==':
                result = userValue == value;
                break;
            case '!=':
                result = userValue != value;
                break;
            default:
                result = false;
        }
        
        // Return condition with evaluation result in the format 'age > 30 => true/false'
        return `${key} ${operator} ${value} => ${result}`;
    } else if (node.type === "operator") {
        const leftResult = evaluateRule(node.left, data);
        const rightResult = evaluateRule(node.right, data);
        let finalResult;

        if (node.value === "AND") {
            finalResult = leftResult && rightResult;
        } else if (node.value === "OR") {
            finalResult = leftResult || rightResult;
        }

        // Return combined rule evaluation with true/false
        return `${leftResult} ${node.value} ${rightResult} => ${finalResult}`;
    }
    return false;
}
