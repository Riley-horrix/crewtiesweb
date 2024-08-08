all: deps
	@ echo 'Error : Please select an option from the available build options.'

build: deps
	@ npm run build

test: deps
	@ npm run lint

server: deps
	@ npm run dev

deps:
	@ npm i

doc:
	@ doxygen
	@ open ./doc/html

.PHONY: all build test server deps doc