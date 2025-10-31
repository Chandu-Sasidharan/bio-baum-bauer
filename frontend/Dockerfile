FROM node:22.21.1-alpine3.21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]