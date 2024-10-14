
deploy:
	# npx nx run-many --target=build --configuration=production
	aws s3 sync dist/apps/planets s3://microapps-main/planets --delete
	aws s3 sync dist/apps/star-wars s3://microapps-main/star-wars --delete
	aws s3 sync dist/apps/starships s3://microapps-main/starships --delete
	aws s3 sync dist/apps/films s3://microapps-main/films --delete
	aws cloudfront create-invalidation --distribution-id E35Q0BXHGZ1RIN --paths "/*"
	
