FROM node:lts as BUILDER
WORKDIR /app
ARG NPM_TOKEN
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.prod.json /app/tsconfig.prod.json
COPY build.ts /app/build.ts
COPY src /app/src
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN echo "@failean:registry=https://npm.pkg.github.com" >> .npmrc
RUN npm run prod
RUN rm -rf .npmrc

FROM node:lts
WORKDIR /app
COPY package.json /app/package.json
COPY --from=builder /app/dist /app/dist
CMD ["npm", "run", "start:p"]

EXPOSE 6555
