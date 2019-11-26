# ANAGRAMS API Documentation
 
This API could be the backend for a game where users would be able to get random strings, submit all corresponding anagrams they think are correct and get a result but also produce basic statistics for each users (for a leaderboard for instance).

As instructed the API is based on the following technologies : the Serverless Framework, NodeJS, Serverless Function (AWS Lambda) and a MySQL DB (AWS RDS). 

This description has purposedly been kept very short as the challenge instructions are already explaining the required features of the API.

### Features

The API we build has three main functionalitites : 

  1. Generating a random string of 6 characters that has at least 1 anagram available
  2. Receiving a user input (array of anagrams) and checking it against the Anagramica's API
  3. Generating a statistical report of for any user


#### Potential Extra Features

- Adding a leaderboard function where users can compare they stats
- Designing a GUI and making the project full stack including stats visualisation for users
- Further improve the random string generator so it nevers produces words from the dictionary using http://www.anagramica.com/lookup/:word
- Automated testing to test the lambda functions on a much larger scale than I managed manually

## Challenges

1. NodeJSE

I had never used NodeJS before this project although I had a decent understanding of Javascript and APIs calls. 
Indeed I had the opportunity to use API calls based on user input and push them to a UI in the racefinder project I have done : https://github.com/raphaelzenou/racefinder . Thankfully Node is very well thought and the community around it is vast and incredibly helpful.

2. Serverless

I simply and plainly discovered the Serverless concept, framework and AWS Lambda offering and therefore the learning curve combined with Node was quite steep right at the start of this project however I found helpful the Serverless documentation, UI and video tutorials to get my project off the ground quickly.

The serverless concept in general is a fascinating concept and AWS offering is extremely fast and cost effective compared to traditional server offering for equivalent REST APIs powered by Node and Express for instance. As I have learned with the DB timeout issues the Serverless technology also has some limitations.

3. Async / Await 

Because the last time I had to use the concept of asynchronous execution I used JQuery and Ajax I did not have to worry to much about promises or call backs and all the specifics of this type of programming. For this project I had to make sure to truly understand the concepts in order to be able to use them in my NodeJS functions especially slightly long execution functions such as DB queries, API calls or the while loop in Generate. 

4. AWS Lambda <> RDS 

It took me several hours to figure out why my code was not running on AWS when interacting with DBs wheras it was working perfectly fine locally with serverless offline. After some reasearch I thought it was my async serverless-sql module that might have been the culprit, I rewrote my code using the standard mysql without async / await without luck. Then the confusing timeout error log from CloudWatch led me on the timeout config path which did not work either. I finally found a lead on the stack overflow thread below : it was a VPC issue in my RDS instance... I forgot to accept all IPs not just my local machine / ISP. 


## Technologies Used

- [NodeJS](https://nodejs.org/)
    - **Node.js** is the project's server-side Javascript execution environement (backend)
- [Serverless Framework](https://serverless.com/)
    - **Serverless** that simplifies AWS serverless Lambda functions setup and deployment
    - Serverless requires Node 6 or higher
- [Serverless Offline module](https://github.com/dherault/serverless-offline)
    - **Serverless Offline** emulates AWS Lambda on local machines to speed up testing and development
- [Request module](https://github.com/request/request)
    - **Request-Promise** is a simplified HTTP request client
- [Serverless-MySQL module](https://github.com/jeremydaly/serverless-mysql)
    - **Serverless MySQL** promised based version of the well known mysql ORM module
    - Serverless MySQL adds a connection management component to the mysql module that is designed specifically for use with serverless applications
    - Supports all standard mysql module queries : https://github.com/mysqljs/mysql#performing-queries
- [AWS Lambda](https://aws.amazon.com/lambda/)
    - **AWS Lambda** is a serverless application development cloud solution
- [AWS RDS](https://aws.amazon.com/rds/)
    - **AWS RDS** is a cloud based MySQL relational database 
- [Anagramica API](http://www.anagramica.com/api)
    - **Anagramica**'s API is a simple API allowing users to generat anagrams arrays and check if words are in the dictionary
## Deployment

Deployment is made thanks to the Serverless Framework and its .yml file containing all required settings to deploy our Anaggrams app on AWS Lambda from the CLI combined with Serverless' web dashboard. The MySQL database is provided by AWS (RDS) too.

## Design Decisions

In this projet async/await has been implemented instead of callbacks to managed processed taking time such as DB Queries, API calls or long loops (while loop in the generate function for instance). 

I chose serverless-mysql for the same reason as it is a clear and concise promise based ORM module specifically designed for serverless applications.
It worked incredibly well as it is dependent on the tried and tested mysql module and was much easier to use than sequelize which seemed a bit too big for this project.

The same applies for the 

## Endpoints


1. **Random string Generator (anagram friendly)**

The user is presented with a random 6 characters strin.


- METHOD : GET 
- ENDPOINT :  /generate
- LOCAL URL : http://localhost:3000/generate
- AWS URL : https://w14l64z000.execute-api.us-east-1.amazonaws.com/dev/generate

- API SAMPLE RESPONSE :
{
	"generatedString": "sinla"
}

- VALIDATION : 
  The strings generated by our API are always checked against this Anagramica API (anagram generator) to make sure we are providing the user with a usable random string in terms of anagrams.
  http://www.anagramica.com/best/:letters


2. **User submission**

The user submits the following array of anagrams: ["snail", "sailn"] via a post request.
The submission including the user ID and random string and the results will be store in a single row in the DB.
The user the receives a response that they scored x points of y possible anagrams.
In our example the user scored 1 point :  "snail" was correct, but "sailn" is incorrect.


- METHOD : POST
- ENDPOINT : /validate
- LOCAL URL : http://localhost:3000/validate
- AWS URL : https://w14l64z000.execute-api.us-east-1.amazonaws.com/dev/validate

- USER SUBMISSION BODY

{
	"userId": "xxx",
	"generatedString": "sinla",
	"anagrams": ["snail", "sailn"]
}

- API SAMPLE RESPONSE

    {
        "totalScore": 3,
        "score": 1,
        "anagrams": ["snail", "nails", "slain"],
        "correct": ["snail"],
        "incorrect": ["sailn"]
    }

- VALIDATION : 
  Similarly to 1. he following API endpoint (GET) has been used to score user submissions as it returns all possible anagrams for a sting.
  http://www.anagramica.com/best/:letters



3. **User statistics**

The user can get personal statistics by simply passing on its user UD in the url (path), see below path variable {userId}.
The API then responds with aggregated data on the user: number of submissions, max possible score and effective user score.
Prospect users having not yet played the game will simply get empty stats but not an error.



- METHOD : GET

- ENDPOINT : /statistics/{userId}
- LOCAL URL : http://localhost:3000/statistics/{userId}
- AWS URL : https://w14l64z000.execute-api.us-east-1.amazonaws.com/dev/statistics/{userId}
  e.g. https://w14l64z000.execute-api.us-east-1.amazonaws.com/dev/statistics/user4

- API SAMPLE RESPONSE

    {
        "numberOfSubmissions": 1,
        "totalAvailableScore": 3,
        "totalUserScore": 0,
    }

## Testing

The three functions have been tried and tested both locally thanks to Serverless Offline and on AWS.

Only manual testing has been carried out so far.

## Credits

On top of the official documentation for each technology / modules I found help and inspiration mostly from the following pages : 

- Serverless video tutorials : https://serverless.com/learn/courses/full-stack-application-development-on-aws/
- 'Awesome Serveless' repo : https://github.com/pmuens/awesome-serverless
- Learning the basincs of mysql : https://fabianosoriani.wordpress.com/2011/08/15/express-api-on-node-js-with-mysql-auth/ 
- Better undertanding path variables : https://medium.com/@fullsour/3-basic-variable-handling-in-serverless-framework-v1-14-0-4388d2feac7f
- Learning about async/ await : https://ponyfoo.com/articles/understanding-javascript-async-await
- Async/ await for NodeJS : https://medium.com/tensult/async-await-on-aws-lambda-function-for-nodejs-2783febbccd9
