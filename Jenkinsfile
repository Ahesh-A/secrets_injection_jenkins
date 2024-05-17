pipeline {
    agent any 
    environment {
        PORT = 3000
    }
    stages {
        stage('start building') {
            steps {
                echo 'Starting build'
            }
        }
        stage('checkout git repository') {
            steps{
                checkout scmGit(branches: [[name: '*/mian']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Ahesh-A/secrets_injection_jenkins.git']])
            }
        }
        stage('run test') {
            steps{
                sh './script/test.sh'
            }
        }
        stage('build project') {
            steps{
                sh './script/build.sh'
            }
        }
        satge('check docker') {
            def isDockerRunning = sh(
                script: 'docker info > /dev/null 2>&1 && echo "Docker is running" || echo "Docker is not running"',
                returnStdout: true
            ).trim()

            if(isDockerRunning == "Docker is not running") {
                error("Docker is not running pleases start and try again")
            } else {
                echo "Docker is running"
            }
        }
        stage('depoly docker container') {
            steps {
                sh './script/deploy.sh'
            }
        }
        stage('deployment verification') {
            steps {
                sh './script/verification.sh'
            }
        }

    }

    post {
        always {
            sh './script/cleanup.sh'
        }
    }
}