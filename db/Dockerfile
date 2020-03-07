FROM mysql:5.7

WORKDIR db

ENV MYSQL_DATABASE record_cart
ENV MYSQL_USER record_buyer
ENV MYSQL_PASSWORD password
ENV MYSQL_ROOT_PASSWORD root

COPY ./sql_scripts /docker-entrypoint-initdb.d/

EXPOSE 3306
