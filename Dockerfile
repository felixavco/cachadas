FROM node:10

LABEL author="Felix Avelar"

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# Install React dependencies
WORKDIR /usr/src/app/client
RUN npm install
# Build static files from React project
RUN npm run build

#Installing main dependencies
WORKDIR /usr/src/app
RUN npm install

# Set Enviroment variables for production
ENV NODE_ENV production
ENV SITE_KEY secret
ENV MONGO_URI mongoURI
ENV SECRET_OR_KEY secret
ENV GOOGLE_CLIENT_ID secret
ENV GOOGLE_CLIENT_SECRET secret
ENV SENDGRID_KEY secret
ENV SMTP_USER usergmail.com
ENV SMTP_PWD userpassword
ENV SMTP_SERVER smtp.gmail.com
ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]






