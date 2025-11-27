# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source files
COPY . .

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "server.js"]
