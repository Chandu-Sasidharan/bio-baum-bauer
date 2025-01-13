FROM node:20.13.1-alpine3.20 

# Install build tools for bcrypt
RUN apk add --no-cache python3 make g++

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with bcrypt rebuilt
RUN npm ci --build-from-source bcrypt

# Copy the rest of the application code
COPY . .

# Expose port 4000
EXPOSE 4000

# Command to run the app
CMD ["npm", "run", "dev"]

