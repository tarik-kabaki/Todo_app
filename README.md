<h1>TODO App</h1>

<h2>Overview</h2>

This is a simple TODO application built with Vue js, Nest.js, and PostgressSQL. The app allows users to add, edit, delete, and mark tasks as completed.

<h2>Features</h2>

- Add a new task
- Edit an existing task
- Delete a task
- Filter tasks by all, Todo, or Done or In progress
- Responsive design

<h2>Installation.</h2>

Make sure you have the following installed on your system:
Node.js
postgreSQL
npm
Clone the repository
```ruby
git clone https://github.com/tarik-kabaki/Todo_app.git
cd todo_app
```
1. Backend Setup
Navigate to the backend directory:
```ruby
cd server
```
2. Install dependencies:
```ruby
npm install
```
3. Start the backend server::
```ruby
npm run start
```
The Backend will be accessible at http://localhost:3000.

1. Frontend Setup
Navigate to the backend directory:
```ruby
cd client
```
2. Install dependencies:
```ruby
npm install
```
3. Start the backend server::
```ruby
npm run dev
```
The Frontend will be accessible at http://localhost:5173.

- Add a Task:
  - Click on the "Add Task" button, enter a task description, and click "Create task."

- Edit a Task:
  - Click on the "Edit" button next to a task to modify it.

- Changes Task Status - priority:
  - Click on the Status or priority button to modify it.

- Delete a Task:
  - Click on the "Remove" button next to a task to remove it from the list.

- Mark a Task as Completed:
  - Change the status to Done.
 
- Filtering Tasks:
  - Use the filter options (All, Todo, In Progress, Done) to display tasks based on their status.

<h1>Docker installation</h1>

1. install docker from docker website: https://docs.docker.com/get-docker/

3. Navigate to the Project Directory where docker-compose.yml file is located
```ruby
cd /todo_app/
```
3.Build and Start the Containers by runing:

Note: make sure that you are located in directory where (docker-compose.yml) is exist

```ruby
docker-compose up --build
```

Now you can access the project at:

- Client will be available on port 80 (http://localhost:80)
- Server will be available on port 3000 (http://localhost:3000)
  
<h1>Technologies Used</h1>

- Frontend:
  - Vue.js
  - TailwindCSS for styling
- Backend:
  - Nest.js
  - TypeOrm
  - Typescript
  - PostgresSQL
- Others:
- 
  - Axios (for HTTP requests)
  - dotenv (for environment variable management)
 
<h1>Contributing</h1>
We welcome contributions! To contribute to this project:

Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -am 'Add your feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.
