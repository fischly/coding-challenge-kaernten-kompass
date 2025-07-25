# Dockerfile based on following blog post by Micheal Hoffmann
# https://mokkapps.de/blog/dockerizing-a-nuxt-app

ARG NODE_VERSION=20.19.3

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable pnpm
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY ./package.json /app/
COPY ./package-lock.json /app/

## Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN npm run build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node","/app/server/index.mjs"]
