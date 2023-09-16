FROM node:lts as BUILDER
ARG NPMTOKEN
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
    NEW_RELIC_LOG=stdout
# etc.
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.prod.json /app/tsconfig.prod.json
COPY .npmrc /app/.npmrc
COPY src /app/src
RUN npm run prod
RUN npm run clean:prod
RUN npm i --omit=dev
RUN rm -rf .npmrc

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
CMD ["node", "./dist/src"]
EXPOSE 6555
