pipeline {
    agent any 
    environment {
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
                checkout scmGit(branches: [[name: '*/1pass']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Ahesh-A/secrets_injection_jenkins.git']])
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
        stage('docker compose') {
            steps {
                withSecrets(config: [connectCredentialId: '1pass_jenkins_token', connectHost: 'http://localhost:8080', opCLIPath: '/home/ahesh-19540/software'], secrets: [[envVar: 'PORT', secretRef: 'op://jenkins_provider/server_credential/port']]) {
                    sh 'docker compose up'
                }
            }
        }
    }
}