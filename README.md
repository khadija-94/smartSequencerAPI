# smartSequencerAPI
## description
simple API service, generate each user a number called here *pointer*, that can be manipulated easily and used with your app

## prerequisite:
nodejs and npm
mongoDB

make sure mongodb is running

## development launching
first install all dependencies using npm:

`npm install`

generate secret key for the server using anyway you prefer or just use the following node command in shell:
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

open *server/environments/development.js*, copy the generated secret key and fill the **SECRET_KEY** variable with it.

## production launching
in order to change the enviroment the app is running,
open *server/config.js*
replace **development** with **production**
and make sure you set all the required variables in *server/environments/production.js*


## run
run the app using the command
`node run start`

**NOTE:** the app is runnging on nodemon by default, you can change this by changing the command in **start** script in *package.json* file.

## API usage
**NOTE:** make sure to replace the variables between {} in the requests with your own values to get it work correctly:

###### Hello World !
make sure the service is running by sending this request:
`curl -X "GET" https://{SERVER_DOMAIN}/`
you should get message saying Hello world!

###### register in the service
first register to the API service by sending this request:
`curl -X "POST" https://{SERVER_DOMAIN}/api/register -H 'Content-Type: application/json' --data '{"email":"{email}}", "password":"{password}}", "pointer": "10"}'`
**email** and **password** keys are required ,while **pointer** key is optional, **default = 1**

you will get **token** in your response, please make sure to save the value of the token in safe place in your end, its only shown on register and you will need to send it in each request using the service.

###### get your current pointer
`curl -X "GET" https://{SERVER_DOMAIN}/api/v1/current -H 'Authorization: Bearer {TOKEN}'`

###### point to the next integer right after my current pointer, the value of the pointer will be changed
`curl -X "GET" https://{SERVER_DOMAIN}/api/v1/next -H 'Authorization: Bearer {TOKEN}'`

###### reset your current pointer
`curl -X "PUT" https://{SERVER_DOMAIN}/api/v1/current -H 'Authorization: Bearer {TOKEN}' -H 'Content-Type: application/json' --data '{"pointer": {SOME_VALUE}}'`

***NOTE***
you can use the service immediately for testing which is launched on heroku by using *smart-sequencer-api.herokuapp.com* as the service domain name,
here are some examples:

curl -X "GET" https://smart-sequencer-api.herokuapp.com/api/v1/current -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBvaW50ZXIiOjEwLCJfaWQiOiI2MTAzMWFhNjdjNjJiYTAwMjI4NzQ5MDkiLCJlbWFpbCI6ImtoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JGYvcWpGR1Q2SWR4NzNNNUwxMTdqQWVhOW1KT2JRYzRRT3V5dVhsS3R1UjFDVy9Ld3k3d2tLIiwiY3JlYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwiX192IjowfSwiaWF0IjoxNjI3NTkzMzgyfQ.QhjWYng_Rf_E2h0MqjPb4NDinkBPTToffJ35eyExBxY'

curl -X "GET" https://smart-sequencer-api.herokuapp.com/api/v1/next -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBvaW50ZXIiOjEwLCJfaWQiOiI2MTAzMWFhNjdjNjJiYTAwMjI4NzQ5MDkiLCJlbWFpbCI6ImtoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JGYvcWpGR1Q2SWR4NzNNNUwxMTdqQWVhOW1KT2JRYzRRT3V5dVhsS3R1UjFDVy9Ld3k3d2tLIiwiY3JlYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwiX192IjowfSwiaWF0IjoxNjI3NTkzMzgyfQ.QhjWYng_Rf_E2h0MqjPb4NDinkBPTToffJ35eyExBxY'


curl -X "PUT" https://smart-sequencer-api.herokuapp.com/api/v1/current -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBvaW50ZXIiOjEwLCJfaWQiOiI2MTAzMWFhNjdjNjJiYTAwMjI4NzQ5MDkiLCJlbWFpbCI6ImtoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JGYvcWpGR1Q2SWR4NzNNNUwxMTdqQWVhOW1KT2JRYzRRT3V5dVhsS3R1UjFDVy9Ld3k3d2tLIiwiY3JlYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0yOVQyMToxNjoyMi4yNjFaIiwiX192IjowfSwiaWF0IjoxNjI3NTkzMzgyfQ.QhjWYng_Rf_E2h0MqjPb4NDinkBPTToffJ35eyExBxY' --data '{"pointer": 1}'