FROM node:10 

LABEL author="Felix Avelar"

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# Install React dependencies
RUN cd client && npm install
# Build static files from React project
RUN npm run build && cd ..

# Set Enviroment variables for production
ENV NODE_ENV production
ENV SITE_KEY secretcaptcha
ENV MONGO_URI mongourlgoeshere
ENV SECRET_OR_KEY mongourlgoeshere
ENV GOOGLE_CLIENT_ID googleclientid
ENV GOOGLE_CLIENT_SECRET gclientsecret
ENV SENDGRID_KEY sendgrid
ENV SMTP_USER user@gmail.com
ENV SMTP_PWD secretPassword
ENV SMTP_SERVER smtp.gmail.com
ENV PORT 80

EXPOSE 80

CMD [ "npm", "start" ]







