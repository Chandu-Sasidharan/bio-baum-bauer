FROM node:20.13.1-alpine3.20 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Expose port 4000
EXPOSE 4000

# Command to run the app
CMD ["npm", "run", "dev"]

