pipeline {
    agent any 
    environment {
        PORT = 3000
        CI = 'true'
    }
    stages {
        stage('start building') {
            steps {
                echo 'Starting build'
            }
        }
        stage('checkout git repository') {
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Ahesh-A/secrets_injection_jenkins.git']])
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
        stage('check docker') {
            steps{
                script{
                    def isDockerRunning = sh(
                        script: 'docker info > /dev/null 2>&1 && echo "Docker is running" || echo "Docker is not running"',
                        returnStdout: trueP
                    ).trim()

                    if(isDockerRunning == "Docker is not running") {
                        error("Docker is not running pleases start and try again")
                    } else {
                        echo "Docker is running"
                    }
            }
            }
           
           
        }
        stage('depoly docker container') {
            steps {
                sh './scripts/deploy.sh'
            }
        }
        stage('deployment verification') {
            steps {
                sh './scripts/verification.sh'
            }
        }

    }

    post {
        always {
            sh './scripts/cleanup.sh'
        }
    }
}