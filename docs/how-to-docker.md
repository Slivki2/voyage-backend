### Guides how to Dockerize the project
https://akshaykrisonz.medium.com/deploy-nodejs-app-using-docker-in-ec2-145b239459f
https://ljmocic.medium.com/deploy-node-js-application-with-mysql-database-to-aws-ec2-using-docker-compose-3e5034c034ce

## Docker

To login to the docker, run the following command:
```bash
# Enter your username and password from the Docker Hub
$ docker login
```

To build the image, run the following command:
```bash
$ docker build -t <IMAGE_NAME> .
````

To push the image to the repository, run the following command:
```bash
# Where latest is the tag
$ docker push <IMAGE_NAME>:latest
```

To run docker daemon **if needed**, run the following command:
```bash
$ sudo systemctl start docker
```

To pull the image from the repository, run the following command:
```bash
# Where latest is the tag
$ docker pull <IMAGE_NAME>:latest
```

To run the image, run the following command:
```bash
$ docker run -p <APP_PORT>:<APP_PORT> <IMAGE_NAME>
```

To remove the image from the local machine, run the following command:
```bash
# To list all images
$ docker images
# To remove the image
$ docker rmi <CONTAINER_ID>
```

To clean up the docker system, run the following command:
```bash
$ docker system prune
# With volumes
$ docker system prune -a --volumes
```

To check the logs of the container, run the following command:
```bash
$ docker logs <CONTAINER_ID>
```

---

## docker-compose

To check the version of docker-compose, run the following command:
```bash
$ docker-compose --version
```

To run the docker-compose, run the following command:
```bash
$ docker-compose up -d
```

To stop the docker-compose , run the following command:
```bash
$ docker-compose stop
```

To stop the docker-compose and remove the containers, run the following command:
```bash
$ docker-compose down
# OR to remove the volumes
$ docker-compose down -v
```