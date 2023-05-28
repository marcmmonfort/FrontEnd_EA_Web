# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Install Git
#RUN apk add --no-cache git

# Clone the Git repository
#RUN git clone https://github.com/username/my-react-app.git .
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Use the nginx image as a parent image
FROM nginx:alpine

# Copy the built application to the nginx container
COPY --from=0 /app/build /usr/share/nginx/html

# Copy the nginx configuration file to the container
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]