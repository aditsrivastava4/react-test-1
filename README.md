# Chat Application

This project is to create a Chat Application for multiple users with multiple users (many to many).

## Backend
### [Flask](http://flask.pocoo.org/) 

#### Python Modules

* **models.py**: Creates Table for User Schema and Chat Message Schema.
* **databaseOperation.py**: Handle all Database Operations.
* **views.py**: It is the main module which used to run the Flask server.
* **LoginSignUp.py**: Handle all server-side Login and SignUp tasks.
* **Chat.py**: Handle all server-side messaging sending tasks.
   
##### Dependencies
* **Flask** version 1.0.2
* **SQLAlchemy** version 1.2.16
* **passlib** version 1.7.1
* **psycopg2** version 2.7.6.1

## Frontend
### [ReactJS](https://reactjs.org)

#### JavaScript Modules

* **App.js**: It is the main JS module which handle all the dynamic changes to the UI.
* **navbar(index.js)**: It is the NavBar component it is used to render NavBar.
* **login_signup(index.js)**: It is the Login and SignUp component it is used to render Login and SignUp forms.
* **main(index.js)**: It is the Chat component used to render chat box and its form.


## DataBase Setup

* First Download and Install [PostgreSQL](https://www.postgresql.org/download/).
* Then Setup a Database in PostgreSQL.
* Then clone the repo 
```
$ git clone  https://github.com/aditsrivastava4/react-test-1.git
$ cd react-test-1/src
```
* In ```src/``` create a file name **DBcredential.json** and store your database name and password like the format below.
```
{
	"DBname": "your-database-name",
   "DBuser": "your-database-user",
	"password": "your-database-password"
}
```
## To Run

Run the following commands in order.
```
$ cd react-test-1/scr/chatapp-ui
```
