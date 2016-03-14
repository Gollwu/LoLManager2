#Possible set up
##How to install 
~~~
npm install
~~~

##Tools
###Logger
https://www.npmjs.com/package/simple-node-logger

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
    ap: 10,
    hp: 10
},
{
    _id: "akali", 
    ap: 10,
    hp: 10
}
~~~~


