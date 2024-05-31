# Use the official Node.js image as a base image
FROM node:20-alpine

# Install dependencies required for building native modules
RUN apk add --no-cache make gcc g++ python3

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if you use a build step, otherwise omit this)
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]