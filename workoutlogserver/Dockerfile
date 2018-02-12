FROM node:6.12.3


# ENV DB_USER="trainer" DB_PASS="password" DB_HOST="localhost"


WORKDIR /workoutlog

COPY . ./
# COPY ./package.json ./package-lock.json ./db.js ./app.js ./
# COPY ./config ./middleware ./models ./routes ./
# COPY ./bower_components ./user ./workouts ./

RUN npm install

# allow api calls
EXPOSE 3000

CMD ["npm", "start"]
