FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

#COPY index.html style.css app.js /usr/share/nginx/html/
#COPY data/ /usr/share/nginx/html/data/
COPY . /usr/share/nginx/html/

EXPOSE 80