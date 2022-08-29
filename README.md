# Atoa-api
About
A Nodejs based rest api with 3 endpoints. 
Language, Dependencies/libraries used: Nodejs, Express, mongoose, body-parser, bcrypt, jsonwebtoken.


setup instructions to run the code using docker.
while docker is running.
➢Pull this docker image by running the command in command line.     docker pull shaykhazaan/atoaapi

➢Now run this command:   docker run --name atoa_c -p 3000:3000 shaykhazaan/atoaapi

You can now access api endpoints with any api tool.

Please visit this link for api documentation on how to use api. https://documenter.getpostman.com/view/23052814/VUxKTUmZ

I have also implemented pagination for the transaction list endpoint and can be accessed via url parameters.
e.g. 
http://localhost:3000/
http://localhost:3000/?page=1
http://localhost:3000/?page=2
http://localhost:3000/?page=3
...
