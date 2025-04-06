# Taskie - Smart tasks for your day

Taskie is a powerful task tracking application that allows you to create and track various tasks. Complete with categories, tasks, and subtasks, its easy to keep track of everything that you need to complete in a day. Invite a friend or spouse to join your task list. As you browse your tasks, get a quick view of the weather.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Taskie is a powerful task tracking application that allows you to create and track various tasks. Complete with categories, tasks, and subtasks, its easy to keep track of everything that you need to complete in a day. Invite a friend or spouse to join your task list. As you browse your tasks, get a quick view of the weather.

### Design

![Entry Screen Design image](images/Entry_Screen.png)
![Edit Task Design image](images/Task_Edit_Screen.png)

### Key features

- Login to save your list
- Add, remove, or edit tasks
- Nested tasks
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
- [x] **Login placeholder** - The default page is a login/signup form that accepts an username and password. Additionally, the task list page includes your current username in the "Collaborators" section
- [x] **DB data placeholder** - The task list represents data that will be stored in a DB for each user
- [x] **WebSocket placeholder** - The collaborators section indicates who is currently active (all users who are currently on the websocket) and through the websocket the task list will automatically upate with changes made by other users.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - The majority of these elements were styled globally using main.scss, including many repeat elements of the body to havea consistent styling across the whole site.
- [x] **Navigation elements** - I did my own, simple, styled flex row nav bar
- [x] **Responsive to window resizing** - Using display flex and conditions upon when it should be row vs a column (especially on the lsit page) I was able to dynamically change the page to fit smaller screens
- [x] **Application elements** - Many elements were styled in a consistent manner across the site, giving a unified theme.
- [x] **Application text content** - Styled many text alignments, sizes, and colors in order to have a pleasant looking site
- [x] **Application images** - These tend to have inline styling to change the size of the images to fit appropriately. Once I add react, I will probably turn each of the images into a component that will be an inline SVG that can be stylized using CSS.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I just let npm run dev do its thing
- [x] **Components** - I built the login, add-task, and task-list component from the old html pages. They currently look and behave exactly the same as they did before react.
- [x] **Router** - Routing between login, task list, and add tasks through both the header tabs and through various on-page buttons (such as "Add Task" button on the task list)

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I have created various React components, such as task-list, task-item, weather, collaborators, etc. These implement or mock every functionality the app has. I reactively generate HTML elements and React components to conditionally change text, available buttons, and the number of list elements.
- [x] **Hooks** - I have used useState and useEffect throughout my code, particularly for temporary local states. One difference in my project from many others is that I added in a state management store using Redux Toolkit. This results in me actually using less useState and useEffect, but the selectors and reducers used through Redux are functionally very similar to useState and useEffect and provide hooks to dynamically manage my application.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Done
- [x] **Static middleware for frontend** - Done
- [x] **Calls to third party endpoints** - I call a geo-ip API to get the approximate current location of the user to then pass that into a weather API
- [x] **Backend service endpoints** - I implemented user login/create/logout endpoints along with a suite of endpoints for managing tasks., along with joining task lists. Currently, all data used on those endpoints are stored in local memory.
- [x] **Frontend calls service endpoints** - I implemented a sendRequest function within my api component that handles getting data from the backend, instead of just returning dummy data.
- [x] **Supports registration, login, logout, and restricted endpoint** - I have login, logout, and create, along with all the task endpoints only allowing authorized users.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **User registration** - When the user creates an account, they are created in the db
- [x] **User login and logout** - When a user logs in, an access token is created and saved in the DB. When logging out, that token is deleted.
- [x] **Stores data in MongoDB** - Task list information and tasks are all stored in the DB
- [x] **Stores credentials in MongoDB** - A hashed user password plus their username and an access token are stored in MongoDB
- [x] **Restricts functionality based on authentication** - You can only access the lists if you are authenticated and you can only access the tasks of the list you are joined to.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - The backend supports hosting a websocket and checks for connection health.
- [x] **Frontend makes WebSocket connection** - Every frontend client connects to the backend websocket to handle the collaborators list
- [x] **Data sent over WebSocket connection** - Collaborator events trigger websocket messages so that everyone can see what other collaborators do.
- [x] **WebSocket data displayed** - In the collaborators section, when a collaborator makes an action, a message is displayed for 3 seconds detailing what it was and the task list is updated
- [x] **Application is fully functional** - Every part of the application functions. The list can be modified and updated. Users can create/signin to their accounts. You can join or create a list, and while on a list, you can see what other collaborators do through a websocket connection. Weather information is based on the user's IP address location and fetched from a 3rd party API. All info is stored on a MongoDB database and user authentication persists through cookies.
      Note: The join list feature allows you to create or join a list. The default user's list is "{username}'s List" but can be changed simply by joining a new list, even if that list does not yet exist.
