# Этап 1: сборка
FROM node:22-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Аргументы окружения
ARG VITE_HTTP
ARG VITE_WSS
ENV VITE_HTTP=$VITE_HTTP
ENV VITE_WSS=$VITE_WSS

# Сборка
RUN npm run build

# Этап 2: финальный образ
FROM node:22-alpine

WORKDIR /app

# Установим простой HTTP-сервер
RUN npm install -g serve

# Копируем сборку
COPY --from=builder /app/dist ./dist

# Открываем порт
EXPOSE 4177

# Переменные окружения
ARG VITE_HTTP
ARG VITE_WSS
ENV VITE_HTTP=$VITE_HTTP
ENV VITE_WSS=$VITE_WSS

# Запуск сервера
CMD ["serve", "-s", "dist", "-l", "4177"]
