# ! Important
# Since we rely in our code to environment variables for e.g. db connection
# this can only be run successfully with docker-compose file

# Specify node version and choose image
# also name our image as development (can be anything)
FROM node:14 AS development

# Specify our working directory, this is in our container/in our image
WORKDIR /towchores/src/app
#CMD ["npm", "start"]
# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
#COPY .babelrc ./
# Here we install all the deps
RUN npm install --production

# Bundle app source / copy all other files
COPY . /src

# Build the app to the /dist folder
#RUN npm run build


# Example Commands to build and run the dockerfile
# docker build -t towchores-nest .
# docker run towchores-nest