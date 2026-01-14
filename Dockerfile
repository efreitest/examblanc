FROM node:20-alpine

ENV NODE_ENV=production

# On se place dans le HOME existant (déjà owned par node)
USER node
WORKDIR /home/node

# Crée /home/node/app avec les droits de node (pas de root qui traîne)
RUN mkdir -p app
WORKDIR /home/node/app

# Cache layer
COPY --chown=node:node package*.json ./

# Deps prod only
RUN npm ci --omit=dev && npm cache clean --force

# Code
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "server.js"]
