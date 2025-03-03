# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file (make sure it's in the same directory as your Dockerfile)
COPY .env .env

# Build the application
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start:prod"]
