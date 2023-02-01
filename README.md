# Justice CRM

## Технологический стек

### Frontend:
- Построение приложения - React
- State management - Redux Toolkit
- Маршрутизация - React-Router
- Верстка страницы - Material UI
- Уведомления об операция - React-Toastify
- Сетевые запросы - axios
- Работа с классами - classnames
- Работа с датами - dayjs
- Работа с диаграммами - recharts
- Проверка кода - eslint
- Форматирование кода - prettier
### Backend:
- Построение приложения - express
- Валидация - express-validator
- Работа с БД - mongoose
- Работа с изображениями - multer
- Шифрование пароля - bcrypt
- Работа с CORS - cors
- Работа с токеном - jsonwebtoken
- Вспомогательные библиотеки - nodemon
- Проверка кода - eslint
- Форматирование кода - prettier

## Требования
- Node.js (v18.12.1+)
- NPM (v8.19.2 +)
- MongoDB (v6.0)

## Установка
Перед работой с приложением вам необходимо установить MongoDB для корректной работы бэкенда.
После установки БД вам необходимо установить все зависимости.

С использованием make
```
Из корневой папки
make install
```

Без использования make
```
Из корневой папки
cd ./frontend
npm install
```

```
Из корневой папки
cd ./backend
npm install
```

## Запуск
Перед стартом приложения, необходимо запустить MongoDB.

### Запуск приложения:


C помощью команды make

```
Из корневой папки
make start-backend
make start-frontend
```

Режим разработки
```
Из корневой папки
make start-dev-backend
make start-frontend
```
Эти команды запускают backend на http://localhost:4000 и frontend на http://localhost:3000.

Без команды make

```
Из корневой папки
cd ./backend
npm start
```
Режим разработки
```
Из корневой папки
cd ./backend
npm run dev
```
Эти команды запускают backend на http://localhost:4000.

```
Из корневой папки
cd ./frontend
npm start
```
Эти команды запускают frontend на http://localhost:3000.

