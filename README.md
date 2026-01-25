# Es login y registrar

Proyecto de ejemplo que implementa **login y registro de usuarios** con **rutas protegidas**, utilizando un frontend moderno y un backend robusto. Es una base sencilla pero funcional para proyectos que requieren autenticación.

---

## 📑 Tabla de contenidos

* [Descripción](#descripción)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Características](#características)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)

  * [Instalación local](#instalación-local)
* [Uso](#uso)
* [Ejecución con Docker](#ejecución-con-docker)

---

## 📌 Descripción

**Es login y registrar** es un proyecto sencillo que implementa autenticación de usuarios con **login**, **registro** y **rutas protegidas**. Está pensado como punto de partida para aplicaciones web que necesitan control de acceso.

---

## 📂 Estructura del proyecto

El repositorio está organizado de la siguiente manera:

```bash
/
├── frontend/   # Aplicación Frontend (Next.js)
├── backend/    # API Backend (NestJS)
├── docker-compose.yml
├── README.md
```

---

## ✨ Características

* Registro de usuarios
* Inicio de sesión (Login)
* Autenticación con **JWT**
* Protección de rutas
* Encriptación de contraseñas con **bcrypt**
* **Refresh Token** automático cuando el access token está por vencer (5 minutos)
* Manejo de expiración de sesión
* Separación clara de frontend y backend
* Soporte para ejecución local y con Docker

---

## 🛠 Tecnologías

### Frontend

* Next.js

### Backend

* NestJS
* JWT (JSON Web Tokens)
* bcrypt
* typeorm
* sqlite
* swagger

### Otros

* Docker
* Docker Compose

---

## ⚙️ Instalación

### Instalación local

#### 1. Clonar el repositorio

```bash
git clone https://github.com/devluisteran/auth_next_nest.git
cd tu-repositorio
```

#### 2. Instalación del Frontend

```bash
cd frontend
npm install
```

#### 3. Instalación del Backend

```bash
cd ../backend
npm install
```

---

## ▶️ Uso

### Levantar el Backend

Desde la carpeta `backend`:

```bash
npm run start:dev
```

El backend quedará disponible en:

```
http://localhost:4000
```

### Levantar el Frontend

Desde la carpeta `frontend`:

```bash
npm run dev
```

El frontend estará disponible en:

```
http://localhost:3000
para login dirigete a http://localhost:3000/auth/login
```

> Nota: Ajusta los puertos según tu configuración si es necesario.

---

## 🐳 Ejecución con Docker

El proyecto ya cuenta con los archivos necesarios para ejecutarse con Docker.

### 1. Requisitos

* Docker
* Docker Compose

### 2. Levantar el proyecto completo

Desde la carpeta raíz del proyecto:

```bash
docker-compose up --build
```

Este comando:

* Construye las imágenes del frontend y backend
* Levanta ambos servicios automáticamente
* Conecta los contenedores según la configuración existente

### 3. Detener los contenedores

```bash
docker-compose down
```

---

## 

Este proyecto es ideal como base para sistemas más grandes que requieran autenticación. Puedes extenderlo fácilmente agregando roles, permisos, refresh tokens u otras funcionalidades de seguridad.

---

¡Listo! 🚀
