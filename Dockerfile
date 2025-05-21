# Use an official Node.js runtime with the specific version as a parent image
FROM node:20.10.0-alpine

# Set the working directory to the root directory
WORKDIR /

# Copy the package.json and yarn.lock files to the root directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the root directory
COPY . .

ARG NEXT_PUBLIC_HELIUS_RPC_URL

# Set the environment variables
ENV NEXT_PUBLIC_HELIUS_RPC_URL=${NEXT_PUBLIC_HELIUS_RPC_URL}

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
