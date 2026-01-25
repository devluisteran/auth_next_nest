# Usar una imagen específica para Next.js
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar el código fuente
COPY . .

# Variables de entorno para el build
ARG NEXT_PUBLIC_API_URL=http://backend:4000
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production

# Build de la aplicación
RUN npm run build

# Etapa de producción
FROM node:22-alpine AS runner

WORKDIR /app

# Solo copiar lo necesario para producción
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Exponer el puerto
EXPOSE 3000

# Variable para el puerto
ENV PORT=3000

# Comando de inicio
CMD ["npm", "start"]