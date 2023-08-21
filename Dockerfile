FROM oven/bun:0.7.1

WORKDIR /app
COPY . .

RUN \
  bun install && \
  rm -rf ~/.bun

RUN bun build ./src/index.ts --outdir=dist --sourcemap=external --target=bun

EXPOSE 5100

ENV NODE_ENV=production 

CMD ["bun", "run", "dist/index.js"]
