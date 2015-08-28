# WanderList
The WanderList is an interactive pinboard where users can share their adventures and desired trips. Users can drop red pins for places that they want to go and green pins for the places that they've been. Clicking on a pin opens a sidebar where details about the users trips can be added, including photos and notes.

### Collaborators
- Alex Bannon: https://github.com/alexbannon
- Christine Lovett: https://github.com/christinelovett
- Lon Phelps: https://github.com/puzzleboks
- Malissa Romero: https://github.com/malissaromero

### Approach
Our method as a team was extremely collaborative from the beginning. Each day as a group we would have a scrum to identify where we were in the process, and then assign the tasks that we would work on. During the course of the project we programmed individually, in pairs, and as a group.

### Trello Schedule:

https://trello.com/b/mK5e9BLZ/clam

### Beginning Process
1. Brainstorming
2. Design Studio exercise
3. User Stories
4. Wireframing
5. Basic Express setup

### Implementation
WanderList is a single-page application written with Express and Sequelize, utilizing Ajax calls to interact with the Mapbox API. The app uses three models: users, pins, and photos. Each user can have many pins, and each pin can have many photos. User authentication was accomplished using Passport and OAuth to sign in with Twitter.

### Installation Instructions

In order to install the WanderList app on your local machine, follow these steps:

* Fork/clone [this repo](https://github.com/alexbannon/wanderlist)
* Navigate to the wanderlist directory
* Run the following commands in the terminal:
```bash
$ npm install
$ node db/schema.js
$ node db/seeds.js
```
* Run Postgresql
* Make sure the server is running:
```bash
$ nodemon
```
* Open a browser and go to localhost:3000/
