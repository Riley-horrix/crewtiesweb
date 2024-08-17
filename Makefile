all: deps
	@ echo 'Error : Please select an option from the available build options.'

build: deps
	@ npm run build

test: deps
	@ npm run lint

server: deps
	@ npm run dev

server-noinstall:
	@ npm run dev

server-network: @deps
	@ npm run dev -- -H 192.168.1.233

deps:
	@ npm i

doc:
	@ doxygen
	@ open ./doc/html

.PHONY: all build test server deps doc
