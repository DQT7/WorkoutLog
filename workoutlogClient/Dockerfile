FROM node:6.12.3


WORKDIR /workoutlog/client

COPY . ./

RUN npm install

# allow access to client server
EXPOSE 8080

CMD ["npm", "start"]
