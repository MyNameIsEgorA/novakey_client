# Этап 1: сборка
FROM node:22-alpine AS builder

WORKDIR /app

# Копируем только package.json и lock-файл для установки зависимостей
COPY package*.json ./
RUN npm ci

# Копируем остальной исходный код
COPY . .

# Аргумент сборки и переменная окружения

ARG VITE_HTTP
ARG VITE_WSS
ENV VITE_HTTP=$VITE_HTTP
ENV VITE_WSS=$VITE_WSS

# Сборка проекта
RUN npm run build

# Этап 2: финальный минимальный образ
FROM node:22-alpine

WORKDIR /app

# Устанавливаем только продакшн-зависимости (если нужно)
# COPY package*.json ./
# RUN npm install --omit=dev

# Копируем только собранный frontend
COPY --from=builder /app/dist ./dist

# Экспонируем порт для preview-сервера
EXPOSE 4177

# Устанавливаем переменную окружения

ARG VITE_HTTP
ARG VITE_WSS
ENV VITE_HTTP=$VITE_HTTP
ENV VITE_WSS=$VITE_WSS

# Запускаем сервер предпросмотра Vite
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4177"]