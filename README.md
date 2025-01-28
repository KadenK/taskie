# Taskie - Smart tasks for your day

Taskie is a powerful task tracking application that allows you to not only create and track various tasks, but also automate task creation based on real-world factors such as weather! Complete with categories, tasks, and subtasks, its easy to keep track of everything that you need to complete in a day. Invite a friend or spouse to join your task list. Combine this with our powerful smart features like weather-based tasks and you'll never forget to cover the cushions before a rainy day again!

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Taskie is a powerful task tracking application that allows you to not only create and track various tasks, but also automate task creation based on real-world factors such as weather! Complete with categories, tasks, and subtasks, its easy to keep track of everything that you need to complete in a day. Invite a friend or spouse to join your task list. Combine this with our powerful smart features like weather-based tasks and you'll never forget to cover the cushions before a rainy day again!

### Design

![Entry Screen Design image](images/Entry_Screen.png)
![Edit Task Design image](images/Task_Edit_Screen.png)

### Key features

- Login to save your list
- Add, remove, or edit tasks
- Nested tasks
- Tasks can completed over more than one day
- Smart tasks that automatically apply depending on weather conditions
- Share your task list with others
- Convenient weather display for task planning

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Component structure will be defined using proper HTML with multiple dynamic components that will be show/hidden through React to create the effect of a dynamic, single-page app
- **CSS** - Stylization will be used for the on-screen organizations of the various components that will adapt to the screen size. It will have a unique theme throughout the application.
- **React** - Conditional rendering of various React-defined components in the style of a single-page dynamic application
- **Service** - A backend service with endpoints for:
  - login
  - Reading/writing user's task list
  - Accessing public weather API
- **DB/Login** - Store users and their task lists in a database. Authenticate users, save a user's task list if signed in to be accessible anywhere
- **WebSocket** - When a shared list is modified, the modification is broadcasted to all users currently on the shared list

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [taskie.click](https://taskie.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I have my default login page along with the task list page and an Add Task page, 3 in total.
- [x] **Proper HTML element usage** - I have used proper HTML structure including BODY, NAV, MAIN, HEADER, and FOOTER on every one of my pages, including a logical structure for the content of the app.
- [x] **Links** - There are working links in both the header of the page and at places such as "Add Task" button on the task list and the "Create Task" button at the end of the creating task form links you back to the list.
- [x] **Text** - There are various textual descriptions and labels throughout the application to help describe how to properly use the app.
- [x] **3rd party API placeholder** - There is a placeholder for the external weather API that I will be querying.
- [x] **Images** - There are various images, such as a brand logo, chevron icons, and weather indicators on the site.
- [x] **Login placeholder** - The default page is a login/signup form that accepts an email and password. Additionally, the task list page includes your current username in the "Collaborators" section
- [x] **DB data placeholder** - The task list represents data that will be stored in a DB for each user
- [x] **WebSocket placeholder** - The collaborators section indicates who is currently active (all users who are currently on the websocket) and through the websocket the task list will automatically upate with changes made by other users.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
