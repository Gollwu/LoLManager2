#League of Legends Manager v0.1
##How to install 
~~~
npm install
~~~

##How to run

* Create config.js file in config folder

~~~~
var config = {
	development: {		
		//mongodb connection settings
		database: {
			host:   'host',
			port:   ':port',
			db:     '/db'
		},
		//server details
		server: {
			host: 'host',
			port: 'port'
		}
	}
};
module.exports = config;
~~~~         

* browserify app/app.js > build/bundle.js 
* node server


##File structure
app/
* Middleware: routing, models and logger

config/
* Environment-based configuration for servers and databases 
* Development JavaScript for databases

public/app
* Angular Controllers
* Angular Directives
* Angular Services

public/build
* Browserify build

public/views
* HTML/CSS code of pages
* FrontEnd Javascript 
* Images

tests/
* To be updated in 0.2


##How to run tests (To be updated in 0.2)


##Dependencies
###Development
* Simple Node Logger
* Morgan
* Promise
* Express
* Browserify

###Database
* Sequelize
* pg

###Testing (To be updated in 0.2)
* SuperTest
* Mocha
* Chai






