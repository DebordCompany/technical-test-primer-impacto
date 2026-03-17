pro-up-containers:
	docker compose -f pipeline.yml --env-file .env up -d --build
pro-down-containers:
	docker compose -f pipeline.yml down
local-up-containers:
	docker compose --env-file .env.local up -d --build
local-down-containers:
	docker compose down