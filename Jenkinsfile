def config = [
    connectHost: 'http://localhost:8080',
    connectCredentialId: 'zv_jenkins_token',
    opCLIPath: '/home/ahesh-19540/software'
]
def secret = [
    [envVar: 'PORT', zvRef:'' ]
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
        stage('test zvSecret') {
            steps {
                ZvSecrets(config: config, secret: secret) {
                    sh 'echo $PORT'
                }
            }
        }
   }

   post {
    always{
        ZvSecrets(config: config, secret: secret) {
            sh './scripts/zv.sh'
        }
    }
   }
}