build-dev:
	cd client && $(MAKE) build-dev
	docker build -t api-server .

run-dev:
	docker-compose -f docker-compose.yml up

SSH_STRING:=myapp@192.168.0.157

ssh:
	ssh $(SSH_STRING)

copy-files:
	GLOBIGNORE='./node_modules:./client/node_modules:./client/build' scp -r ./* $(SSH_STRING):/home/myapp/heroku_build_linux/