FROM node:24-alpine AS builder
WORKDIR /app
ARG VITE_BACK_API
ENV VITE_BACK_API=$VITE_BACK_API
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]