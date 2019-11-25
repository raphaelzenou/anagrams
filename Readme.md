# ANAGRAMS 

# Part 1 - Challenge Instructions


## Anagrams

The object of this task to build an API to support a game involving anagrams. Your solution should use the Serverless Framework, NodeJS, AWS and MySQL. Please reply with a link to a public repository containing your solution within one week of receiving the task, and get in touch if you have any questions. Include a discussion of anything that you found challenging, explanation of design decisions you took and what you would add given more time. You needn't spend more than a few hours on this, we are more interested in seeing how you approach the task than receiving a finished product.

## Gameplay

You don't need to provide a UI for the game. A hypothetical client app would call an API to generate a 5 or 6 letter sequence of characters. The user would be presented with this string, and would need to think of as many valid anagrams derived from the string as possible. They would then submit their anagrams as an array of strings to an API which must verify their submission. The user gains a point for each valid anagram, and loses a point for each invalid anagram. For example:

- the user is presented with the string "sinla"
- the user submits the following array of anagrams: ["snail", "sailn"]
- the actual valid anagrams for this string are: ["snail", "nails", "slain"]
- the user should receive a response that they scored 0 points of 3. "snail" was correct, but "sailn" is incorrect.

User submissions should be stored in a MySQL database.

## API

An API endpoint should be created to generate a random 5 or 6 letter string. The string should have at least one valid anagram.

GET https://www.example.com/generate

RESPONSE

{
	"generatedString": "sinla"
}

---

An API endpoint should be created to validate a user submission, store their submission and return a score to the client. It should require a user ID, it should include the 5 random 5 letter string, and it should include an array of anagrams inputted by the user. It should respond with the number of possible anagrams, and the user's score for their submission.

POST https://www.example.com/validate

BODY

{
	"userId": "xxx",
	"generatedString": "sinla",
	"anagrams": ["snail", "sailn"]
}

RESPONSE

{
	"totalScore": 3,
	"score": 0,
	"anagrams": ["snail", "nails", "slain"],
	"correct": ["snail"],
	"incorrect": ["sailn"]
}

---

An API endpoint should be created to provide statistics for a given user ID. It should return the number of submissions, the total available score and the total score achieved by the user. It could provide time series data to allow the client to display a graph of the user's performance over time, or any other statistics that you think could be interesting.

GET https://www.example.com/statistics/{userId}

RESPONSE

{
	"numberOfSubmissions": 1,
	"totalAvailableScore": 3,
	"totalUserScore": 0,
	...
}

## Validation

The following API can be used to validate user submissions:

http://www.anagramica.com/api

It's probably a good idea to double check that the values returned by this third party API are correct. Create a method that accepts two strings and determines whether the strings are anagrams of each other.

## Documentation

API documentation should be provided to explain how the API endpoints should be called, and what kind of responses to expect.

Part 2 of this Readme file will be dedicated to this API documentation.


# Part 2 - API Documentation [TBC]

 
## API

### Features

#### Existing Features

#### Features Left to Implement

## Technologies Used

- [Javascript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript)
    - The project uses **Javacript** as its unique programming language
- [Node.js](https://nodejs.org/)
    - The project uses **Node.js** as its server side Javascript execution environement (backend)
    - version 12.13.1. (Serverless requires Node 6 or higher)
- [Serverless Framework](https://serverless.com/)
    - The project uses **Serverless** that simplifies AWS serverless Lambda functions setup
    - version 1.58.0
    - additional modules : https://github.com/pmuens/awesome-serverless 
- [Serverless Offline](https://github.com/dherault/serverless-offline)
    - The project uses **Serverless** that emulates AWS λ our local machine to speed up development
- [Request-Promise](https://github.com/request/request-promise)
    - **Request-Promise** is a simplified HTTP request client 'request' with Promise support
- [AWS Lambda](https://aws.amazon.com/lambda/)
    - The project uses **AWS Lambda** as its serverless application development cloud solution
- [AWS RDS](https://aws.amazon.com/rds/)
    - The project uses **AWS Lambda** as its cloud based MySQL relational database 
<!-- - [Sequelize](https://sequelize.org/)
    - The project uses **Sequelize** as its ORM for its MySQL database -->

https://github.com/jeremydaly/serverless-mysql

Serverless MySQL adds a connection management component to the mysql module that is designed specifically for use with serverless applications
Supports all standard mysql module queries : https://github.com/mysqljs/mysql#performing-queries

https://www.w3schools.com/nodejs/nodejs_mysql.asp 


## Testing

## Deployment

Deployment is made thanks to the Serverless Framework and its .yml file containing all required settings to deploy our Anaggrams app on AWS Lambda from the CLI combined with Serverless' web dashboard.

## Credits

- Serverless documentation : https://serverless.com/framework/docs/ 
- Serverless video tutorials : https://serverless.com/learn/courses/full-stack-application-development-on-aws/
- https://fabianosoriani.wordpress.com/2011/08/15/express-api-on-node-js-with-mysql-auth/ 
- https://medium.com/@fullsour/3-basic-variable-handling-in-serverless-framework-v1-14-0-4388d2feac7f
- https://ponyfoo.com/articles/understanding-javascript-async-await
- https://medium.com/hackernoon/async-await-essentials-for-production-loops-control-flows-limits-23eb40f171bd
- https://medium.com/tensult/async-await-on-aws-lambda-function-for-nodejs-2783febbccd9
- https://irvinlim.com/blog/async-await-on-aws-lambda/