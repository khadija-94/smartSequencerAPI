# smartSequencerAPI

##prerequisite:
nodejs and npm
mongoDB

make sure mongodb is running

##development launching
first install all dependencies using npm:

`npm install`

generate secret key for the server using anyway you prefer or just use the following node command in shell:
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

open *server/environments/development.js*, copy the generated secret key and fill the **SECRET_KEY** variable with it.

##production launching
in order to change the enviroment the app is running,
open *server/config.js*
replace **development** with **production**
and make sure you set all the required variables in *server/environments/production.js*


##run
run the app using the command
`node run start`

**NOTE**: the app is runnging on nodemon by default, you can change this by changing the command in **start** script in *package.json* file.






