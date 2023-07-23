FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts as BUILDER
WORKDIR /app
COPY package*.json tsconfig*.json build.ts ./
COPY src ./src
COPY .npmrc /root/
RUN npm run prod && \
    npm run clean:p && \
    npm i --omit=dev && \
    rm -rf .npmrc

FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 6555
CMD ["node", "./dist"]
