# Etapa de construcción
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de la aplicación
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:22-alpine

WORKDIR /app

# Instalar dependencias necesarias para SQLite
RUN apk add --no-cache sqlite

# Crear usuario no-root (mejores prácticas de seguridad)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar dependencias y código compilado desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./

# Crear carpeta para la base de datos SQLite
RUN mkdir -p /app/data

# Dar permisos al usuario para la carpeta data
RUN chown -R nestjs:nodejs /app/data

# Cambiar a usuario no-root
USER nestjs

# Exponer el puerto
EXPOSE 4000

# Comando para ejecutar
CMD ["node", "dist/main"]