# Personal Music Library

This is a multi-user web application that allows a user to manage their music library. 

[BACKEND REPO LINK](https://github.com/takshil45/personalMusicLibraryBackend)  
[FRONTEND REPO LINK](https://github.com/takshil45/personalMusicLibraryFrontend)

### Technology Stack

Personal Music Library uses a number of open source projects to work properly:

* [AngularJS](https://angularjs.org/) - HTML enhanced for web apps!
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Sails.js](https://sailsjs.com/) - fast node.js network app framework
* [MongoDB](https://www.mongodb.com/) - Scalable Database (For now I have used LocalDB as I was having DB connection issues)

# User Features!

  - View Personal Music Library
  - Add new music to personal library
  - Delete a song from personal library
  
# Admin Features!

  - Add new song to the database of songs (catalog)
  - View leaderboard of songs
  - View leaderboard of Artists

You can also:
  - Sort the dashboard table based on the fields by clicking on the feild cell
  

# Assumptions:

  - There is one artist for one song
  - Only admin can add songs to the songs catalog


# Installation

###### Prerequisite: 
Install Node on your machine
Visit [Install Node](https://nodejs.org/en/download/)

### Backend

```sh
$ cd personalMusicLibraryBackend
$ npm install
$ sails lift
```

### Frontend

Open new command prompt
```sh
$ cd personalMusicLibraryFrontend
$ npm install -g @angular/cli@6.1.2
$ npm install
$ ng serve
```

Verify the application by visiting in your preferred browser.

```sh
localhost:4200
```

### Testing

 - To create admin use Postman:
 URL: 
 ```sh
 POST localhost:1337/register
 ```
 
 Body:
 ```sh
{
    "name":"Your Name",
    "email" : "Your_email_id",
    "password" : "Your_password",
    "isAdmin" : "true"
 }
```
  
 - Admin must add new songs to the song catalog so that user can add the songs to their library.
 - All above mentioned features can be tested.

### Furuture Scope

 - Add search feature for the user to search through the songs catalog
 - Add CSS to the web pages
 - Encrypt user login and signup
 - Add navigations to the admin dashboard for better user experience
 - Write few tests

##### Credits
Written by Takshil Mehta
This application is written from scratch without using any open source codebase available for any of the mentioned features.


