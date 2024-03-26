# Amazon EC2 instance

### The app is deployed to the AWS EC2 instance (Amazon Linux)

To connect AWS EC2 instance where the image will be deployed, run the following command in your terminal:
```bash
# Default user is "ec2-user"
$ ssh -i "YOUR_SSH_KEY.pem" <MACHINE_USER_NAME>@<PUBLIC_DNS>
# Example
$ ssh -i "private_key.pem" ec2-user@ec2-00-00-000-00.aws-region-2.compute.amazonaws.com
```

---

## Initial setup steps:
### Docker installation
Amazon Linux is using `yum` package manager, so to install docker, run the following command:
```bash
$ sudo yum install docker
```

To run docker commands without sudo, run the following command:
```bash
$ sudo usermod -a -G docker <MACHINE_USER_NAME>
```

Download and install docker-compose
```bash
$ sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
```

Fix permissions
```bash
$ sudo chmod +x /usr/local/bin/docker-compose
```

To check the version of docker-compose, run the following command:
```bash
$ docker-compose --version
```

Install git
```bash
$ sudo yum install -y git
```

Clone the repository of the app
```bash
$ git clone <YOUR_REPOSITORY_URL>
```

To run docker daemon if needed, run the following command:
```bash
$ sudo systemctl start docker
```

---

## Utils
To check the version of the OS, run the following command:
```bash
$ cat /etc/os-release
```

Show the list of files in the current directory
```bash
$ ls
# Include hidden files
$ ls -a
```