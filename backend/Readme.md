# Postgres
docker run --name bai-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres:latest
# Init database
1. In docker desktop select container and terminal
2. psql -U postgres 
3. CREATE DATABASE bai;