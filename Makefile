BIN=node_modules/.bin
AUTOPREFIXER_BROWSERS="> 1%, last 2 versions, Firefox ESR, Explorer 9"

all: sass autoprefixer
	@echo "Done!"

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
