docker pull mysql

export DOCKER_ROOT=/root/mysql
rm -rf $DOCKER_ROOT
mkdir -p $DOCKER_ROOT/conf $DOCKER_ROOT/logs $DOCKER_ROOT/data $DOCKER_ROOT/sql

docker rm -f nk-mysql
docker run -p 3310:3306 --name nk-mysql -v $DOCKER_ROOT/conf:/etc/mysql/conf.d -v $DOCKER_ROOT/logs:/logs -v $DOCKER_ROOT/data:/var/lib/mysql -v $DOCKER_ROOT/sql:/sql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

docker exec -it nk-mysql /bin/bash

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

source /sql/nk.sql;

mysql -h 127.0.0.1 -P 3310 -u root -p123456