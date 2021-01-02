# demo node app - developing with Docker

This demo app shows a todo app using
- index.html with pure js and css styles
- nodejs backend with express mode
- mongodb for data storage

All components are docker-based

### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8081 from your browser_
    
Step 2: in mongo-express UI - create a new collection "todo" in the database "my-db"
    
_You can access the application under localhost:3000 from your browser_


### Short Notes
[docker short notes]

[docker short notes]: https://github.com/noelroy/short-notes/tree/main/docker