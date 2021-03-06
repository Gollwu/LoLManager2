#Possible set up
##How to install 
~~~
npm install
~~~

##How to run
node server
browserify app.js (if change frontend js code)

Globally install: bower, gulp, tsd and typescript

##How to run tests
~~~~
npm test
~~~~

##File structure
app/
* Middleware: routing, models

config/

public/
* frontend view...

tests/

##Tools
###Logger
https://www.npmjs.com/package/simple-node-logger
https://github.com/expressjs/morgan

###Testing
https://mochajs.org/
See example in tests/server.js

###Possible database
If we decide to go with MongoDB, we want to favor read speed over writing speed.

####De-normalized db

Players
~~~~javascript
{
    _id: "krekkles", 
    team: "Raviolis",
    championsAffinity: [
        {name: "ahri", affinity: 50},
        {name: "ezreal", affinity: 50}
    ] , 
    playersAffinity: [
        {name: "gollwu", affinity: 50},
        {name: "qruthur", affinity: 50}
        {name: "benichou", affinity: 50}
    ]
},
{
    _id: "gollwu", 
    team: "CounterRaviolis",
    championsAffinity: [
        {name: "ahri", affinity: 50},
        {name: "ezreal", affinity: 50}
    ] , 
    playersAffinity: [
        {name: "gollwu", affinity: 50},
        {name: "qruthur", affinity: 50}
        {name: "benichou", affinity: 50}
    ]
}
~~~~

Champions
~~~~javascript
{
    _id: "ahri", 
    strength: 10
},
{
    _id: "akali", 
    strength: 10
}
~~~~


##REST-like API
Simple interface definition
####Players
GET all champions
~~~~javascript
/dataSource/champions
~~~~
Return 
* name
* team

GET all players
~~~~javascript
/dataSource/players
~~~~
Return 
* name
* team

--
GET team
~~~~javascript
/dataSource/teams/:teamid
~~~~
Return 
* name
* array id of players

--
GET a specific player
~~~~javascript
/dataSource/players/:playerid
~~~~
Return 
* name
* team




