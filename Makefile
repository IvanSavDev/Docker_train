install-frontend:
	cd frontend; npm install

install-backend:
	cd backend; npm install

install:
	make install-backend & make install-frontend

start-frontend:
	cd frontend; npm start

start-backend:
	cd backend; npm start

start-dev-backend:
	cd backend; npm run dev