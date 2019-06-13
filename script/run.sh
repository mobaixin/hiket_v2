for port in 8000 8001 8002 8003 8004 8005
do
    pid=$(netstat -nlp | grep :$port | awk '{print $7}' | awk -F"/" '{ print $1 }');

    #杀掉对应的进程，如果pid不存在，则不执行
    if [  -n  "$pid"  ];  then
    kill  -9  $pid;
    fi
done

nohup java -jar aliyun.jar --server.port=8000 &
nohup java -jar aliyun.jar --server.port=8001 &
nohup java -jar aliyun.jar --server.port=8002 &
nohup java -jar aliyun.jar --server.port=8003 &
nohup java -jar aliyun.jar --server.port=8004 &
nohup java -jar aliyun.jar --server.port=8005 &

nohup java -jar tenxun.jar --server.port=8000 &
nohup java -jar tenxun.jar --server.port=8001 &
nohup java -jar tenxun.jar --server.port=8002 &
nohup java -jar tenxun.jar --server.port=8003 &
nohup java -jar tenxun.jar --server.port=8004 &
nohup java -jar tenxun.jar --server.port=8005 &

nohup java -jar caolia.jar --server.port=8000 &
nohup java -jar caolia.jar --server.port=8001 &
nohup java -jar caolia.jar --server.port=8002 &
nohup java -jar caolia.jar --server.port=8003 &
nohup java -jar caolia.jar --server.port=8004 &
nohup java -jar caolia.jar --server.port=8005 &

