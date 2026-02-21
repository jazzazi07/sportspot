# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY tsconfig*.json ./

# Copy web
COPY web ./web

# Install dependencies
RUN npm ci

# Build web application
RUN npm run build --workspace=web

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy only necessary files from builder
COPY --from=builder /app/web/.next ./.next
COPY --from=builder /app/web/public ./public
COPY --from=builder /app/web/package*.json ./

# Install production dependencies only
RUN npm ci --production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
