build:
	ng build --prod --aot

compress:
	find dist -type f -exec sh -c "gzip < {} > {}.gz" \;
	find dist -type f -not -name "*.gz" -exec sh -c "bro --input {} --output {}.br" \;