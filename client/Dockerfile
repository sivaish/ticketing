FROM node:alpine AS deps

WORKDIR /src
COPY package*.json ./
RUN npm ci

FROM node:alpine AS builder
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:alpine AS runner
WORKDIR /src

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /src/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /src/.next ./.next
# COPY --from=builder /src/node_modules ./node_modules
# COPY --from=builder /src/package.json ./package.json
# COPY --from=builder /src/public ./public
# COPY --from=builder /src/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /src/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

# CMD ["npm", "start"]
CMD ["node", "server.js"]