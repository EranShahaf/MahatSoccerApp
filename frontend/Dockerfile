# Use Node 16 Alpine as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including react-scripts
RUN npm install -g react-scripts && \
    npm install --force

# Copy the rest of the application code
COPY . .

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Expose port 3000
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]

# # Build stage
# FROM node:16-alpine AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --force

# COPY . .

# RUN npm run build

# # Production stage
# FROM nginx:alpine

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]