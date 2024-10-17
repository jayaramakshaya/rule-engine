# Rule Engine with Abstract Syntax Tree (AST)

This project implements a simple rule engine using Abstract Syntax Trees (AST) in a web application. The rule engine allows users to create, combine, and evaluate rules based on user data such as age, department, salary, etc. The system supports conditional rules like `AND` and `OR`, and the results are displayed in a detailed format (e.g., `age > 30 => true`).

## Features

- Create Rules: Users can create conditional rules such as `age > 30 AND department == 'Sales'`.
- Combine Rules: Multiple rules can be combined using logical operators like `AND` and `OR`.
- Evaluate Rules: Rules are evaluated against user-provided data in JSON format.
- Detailed Output: The results of rule evaluation are displayed in a detailed format, showing whether each part of the rule evaluates to `true` or `false`.

## Technologies Used

- HTML: For the user interface.
- CSS: For styling the application.
- JavaScript: For handling the logic of rule creation, combination, and evaluation using AST.

## Getting Started

### Prerequisites

- A modern web browser Chrome.
- Visual Studio Code or another code editor for local development.

Usage
1. Creating a Rule
To create a rule, enter a rule in the format below:

Example Input: age > 30 AND department == 'Sales'
After entering the rule, click "Create Rule". The rule will be added to the rule list.

2. Combining Rules
After creating at least two rules, click the "Combine All Rules" button. This will combine all the rules into a single AST using logical operators like AND or OR.

3. Evaluating Rules
To evaluate the rules, enter user data in JSON format. Example user data:

json
{
  "age": 35,
  "department": "Sales",
  "salary": 60000,
  "experience": 3
}
Click "Evaluate", and the rule engine will display the evaluation results for each condition and the overall rule in the format:

age > 30 => true
department == 'Sales' => true
age > 30 AND department == 'Sales' => true

Example 1: Creating a Rule
Rule Input: age > 30 AND department == 'Sales'
User Data: {"age": 35, "department": "Sales"}

Output:
age > 30 => true
department == 'Sales' => true
age > 30 AND department == 'Sales' => true

Example 2: Combined Rule
Rule 1: age > 30 AND department == 'Sales'
Rule 2: salary > 50000 OR experience > 5
Combined Rule: (age > 30 AND department == 'Sales') AND (salary > 50000 OR experience > 5)
User Data:
json
{
  "age": 35,
  "department": "Sales",
  "salary": 60000,
  "experience": 4
}

Output:
age > 30 => true
department == 'Sales' => true
age > 30 AND department == 'Sales' => true
salary > 50000 => true
experience > 5 => false
salary > 50000 OR experience > 5 => true
Combined Rule: (age > 30 AND department == 'Sales') AND (salary > 50000 OR experience > 5) 
