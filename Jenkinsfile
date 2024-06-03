def config = [
    zvServerURI: 'http://localhost:8080',
    zvCredentialId: 'zv_jenkins_token',
    zvCLIPath: '/home/ahesh-19540/software'
]
def secret = [
    [envVar: 'PORT', zvRef:'ZV_PORT'],
    [envVar: 'DOCKER_USERNAME', zvRef:'ZV_DOCKER_USERNAME'],
    [envVar: 'DOCKER_ACCESS_TOKEN', zvRef:'ZV_DOCKER_ACCESS_TOKEN'],
    [envVar: 'CONTAINER_PORT', zvRef:'ZV_CONTAINER_PORT'],
    [envVar: 'TARGET_PORT', zvRef:'ZV_TARGET_PORT'],
]

pipeline {
    agent any
    stages {
        stage('start building') {
            steps {
                echo 'Starting build'
            }
        }

        stage('checkout git repository') {
            steps{
                checkout scmGit(branches: [[name: '*/zv']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Ahesh-A/secrets_injection_jenkins.git']])
            }
        }

        stage('run test') {
            steps{
                sh './scripts/test.sh'
            }
        }

        stage('build project') {
            steps{
                sh './scripts/build.sh'
            }
        }
        stage ('check masking') {
            steps {
                ZvSecrets(config: config, secret: secret) {
                    sh 'echo $DOCKER_USERNAME'
                }
            }
        }
        stage('check docker') {
            steps{
                script{
                    def isDockerRunning = sh(
                        script: 'docker info > /dev/null 2>&1 && echo "Docker is running" || echo "Docker is not running"',
                        returnStdout: true
                    ).trim()

                    if (isDockerRunning == 'Docker is not running') {
                        error('Docker is not running pleases start and try again')
                    } else {
                        echo 'Docker is running'
                    }
                }
            }   
        }

        // stage('docker login') {
        //     steps {
        //         ZvSecrets(config: config, secret: secret) {
        //             sh 'echo $DOCKER_ACCESS_TOKEN | docker login -u $DOCKER_USERNAME --password-stdin'

        //         }
        //     }
        // }

        // stage('docker compose') {
        //     steps {
        //         ZvSecrets(config: config, secret: secret) {
        //             sh 'docker compose up -d'
        //         }
        //     }
        // }
        
        // stage('push image to docker hub') {
        //     steps {
        //         sh 'docker push aheshalagu/hello_server:latest'
        //     }
        // }

        // stage('docker logout') {
        //     steps {
        //         sh 'docker logout'
        //     }
        // }

        // stage('deploy to k8s') {
        //     steps {
        //         ZvSecrets(config: config, secret: secret) {
        //             sh './scripts/k8sdeploy.sh'
        //         }
        //     }
        // }
   }

//    post {
//     always{
//         ZvSecrets(config: config, secret: secret) {
//             sh './scripts/cleanup.sh'
//         }
//     }
//    }
}