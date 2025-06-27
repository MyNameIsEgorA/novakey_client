# Этап 1: сборка
FROM node:22-alpine

WORKDIR /app

# Копируем только package.json и lock-файл для установки зависимостей
COPY package*.json ./
RUN npm install

# Копируем остальной исходный код
COPY . .


# Сборка проекта
RUN npm run build


CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4177"]
