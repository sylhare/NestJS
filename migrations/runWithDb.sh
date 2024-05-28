# docker compose up -d
echo "Make sure that you did 'docker compose up' before running this script"
if [ "$(basename $(pwd))" = "migrations" ]
then
  cd ..
  echo "Changed directory to $(pwd)"
fi
source .env.local
echo "Running migrations"
yarn typeorm schema:drop
yarn typeorm migration:run
echo "Start application"
yarn start:dev