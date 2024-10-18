# Use a base image with the required Node.js version
FROM node:20

# Set the working directory
WORKDIR /app

# Install Python and build tools
RUN apt-get update && apt-get install -y python3 python3-pip build-essential

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application if needed (if you have a build step)
RUN npm run build

# Start the application
CMD ["npm", "start"]
