CREATE DATABASE api
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE api
    IS 'CRUD REST API with Node.js, Express, and PostgreSQL';