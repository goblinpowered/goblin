FROM postgres:14-alpine

ENV POSTGRES_PASSWORD 'example'

COPY init/* /docker-entrypoint-initdb.d/
