# loopback-example-multitenant
Loopback with PostgreSQL Multitenant

## Database

* Create 3 PostgreSQL databases (demo, demo1, demo2)
* Set user/password on [datasources.json](server/datasources.json), [datasources.demo1.json](server/datasources.demo1.json) and [datasources.demo2.json](datasources.demo2.json)

## Install dependencies

    $ npm install

## Migration

    $ grunt
    $ NODE_ENV=demo1 grunt
    $ NODE_ENV=demo2 grunt

## Run

    $ node sever/server.js

## Create registry for tenant demo1

    $  curl --data "username=paulomcnally&message=Hello world" http://127.0.0.1:4000/demo1/tweets

## Browse

    http://localhost:4000/demo1/tweets
    http://localhost:4000/demo2/tweets
