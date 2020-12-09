# scheduler-app

Coping with many coursework deliverables is a stressful part of every student’s life. Design and implement a web-based coursework scheduling application to help students cope with multiple coursework assignments. At its core, the coursework scheduling application contains a list of coursework projects that have to be submitted. The application allows the user to define his or her own milestones for each of the coursework projects. These are only visible to this user, i.e. require a login. In order to be useful, the coursework projects and their milestones exist for longer than one session.

The properties of a coursework project can be designed by you but should at least consist of:

A title of the coursework project, The module for which it is to be submitted, A breakdown of milestones for each coursework project, An intended due date and, The actual completion date. The coursework scheduling application should provide the following core functionality for coursework projects:

Coursework projects can be added.
Coursework projects can be removed.
Coursework projects can be modified.
A listing of all incomplete courseworks and their milestones can be viewed. -Users should be able to share a project with other users by sending a link. At a base level you can assume that anyone who has the link has permission to see that project. The application should be developed using Node.js and Node Express.

# Running the application

1. Clone the Repositary to a local dev machine
2. Ensure that you have the latest versions of node and npm installed, and a good internet connection.
3. Navigate to the directory in a terminal
4. Run the command "npm install" (which will install the application dependencies first)
5. Run the command "node app"
6. Open a browser and navigate to "localhost:3000/"
7. If the PORT 3000 is currently in use, the application will open on PORT 5000 instead.
8. You may login on the app and create an account. 
9. Past Authentication, your dashboard is rendered.
10. You can start by creating a coursework entry. Have fun with it!

# Tips
1. Hitting the  search option reload button after a search, resets the data displayed.
2. Clicking a coursework title name loads up a page with coursework data and a sharing link.
3. Practice using the 'Show' dropdown to display different content.
3. The icons on each coursework bar are active, try them out!
