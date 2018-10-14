# Travelbot

An idea inspired by instagram. Travelbot is instagram for the travellers.

  - Create your own trip
  - Share your trip details, photos, restaurants, hotels, places to the world
  - Find a travel partner
  - Create a new trip based on the # of days, # of travellers, places to visit under your budget
  - Magic

### Tech

Travelbot uses a number of open source projects to work properly:

* React Native - A framework for building a native app using react
* node.js - evented I/O for the backend
* Express - fast node.js network app framework [@tjholowaychuk]
* MySQL - Popular database system
* Twitter Bootstrap - great UI boilerplate for modern web apps
* jQuery - duhh

### Installation

Travelbot requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd travelbot
cd Social-App-For-Travelers
cd SocialAppWeb
npm install
```

Now import the database travelers from travelbot/Social-App-For-Travelers/DB/travelers.sql
Set local database credentials on two places
  - travelbot/Social-App-For-Travelers/SocialAppWeb/models/sequelize.js
  - travelbot/Social-App-For-Travelers/SocialAppWeb/routes/models/sequelize.js

Now run
```sh
node app.js
```
  
Go back to travelbot
One last change in travelbot/src/Config/Config.js
Add your local IP address in the first line

```sh
$ npm install
$ node app
```

In the second terminal/cmd

```sh
$ react-native run-ios
```

OR

```sh
$ react-native run-android
```

License
----

MIT


**Free Software, Hell Yeah!**