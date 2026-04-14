# Stage 1 — build the React app using Node
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files first for layer caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the static dist/ folder
RUN npm run build

# Stage 2 — serve with Nginx, no Node.js in final image
FROM nginx:alpine

# Copy built files from Stage 1 into Nginx's serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
