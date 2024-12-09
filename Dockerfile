# syntax=docker/dockerfile:1.4
FROM node:20-bookworm-slim AS development

WORKDIR /usr/local/app

COPY ./package.json ./package-lock.json ./
RUN npm ci

RUN useradd app
COPY --chown=app . .
RUN chown -R app /usr/local/app
EXPOSE 5173
USER app

CMD [ "npm", "run", "dev" ]
