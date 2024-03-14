# Description: Dockerfile for building and running the app

# Use node alpine as builder image
# first stage is used to build and prepare app before runnin
FROM node:alpine AS builder

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy prisma schema
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Generate prisma client 
RUN npx prisma generate

# Copy app source
COPY . .

# Build app•
RUN npm run build

# Second stage is used to run the app
FROM node:alpine

COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/prisma ./prisma/

# Expose port
EXPOSE 4000

# Run the app and apply migrations
CMD ["npm", "run", "start:migrate:prod"]