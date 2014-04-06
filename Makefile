BIN=node_modules/.bin
AUTOPREFIXER_BROWSERS="> 1%, last 2 versions, Firefox ESR, Explorer 9"

# See https://gist.github.com/toolmantim/6200029#file-makefile-L67-L71
.PHONY: all watch sass autoprefixer

all: sass autoprefixer
	@echo "Done!"

watch:
	@$(BIN)/wach -o "stylesheets/**/*" make all

sass: stylesheets/*.sass
	@echo "Compiling Sass..."
	@sass -r sass-css-importer \
				-r sass-globbing \
				-r susy \
				stylesheets/application.sass:css/application.css \
				stylesheets/application-lt-ie9.sass:css/application-lt-ie9.css

autoprefixer: css/**
	@echo "Autoprefixing..."
	@$(BIN)/autoprefixer css/** -b $(AUTOPREFIXER_BROWSERS)
