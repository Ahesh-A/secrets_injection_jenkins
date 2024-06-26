pipeline {
    agent any
     
    environment {
        CI = 'true'
        KUBECONFIG = 'home/ahesh-19540/tempconfig/kubeconfig'
        zohovault = '/home/ahesh-19540/.npm-packages/bin/zohovault'
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

        
        stage('docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'a088496d-ae0a-4920-95ac-bd89d3ede7c2', passwordVariable: 'psword', usernameVariable: 'usrname')]) {
                    sh 'echo $psword | docker login -u $usrname --password-stdin'

                }
            }
        }

        stage('docker compose') {
            steps {
                sh '$zohovault run --exec="docker compose up -d"'
            }
        }
        
        stage('push image to docker hub') {
            steps {
                sh 'docker push aheshalagu/hello_server:latest'
            }
        }

        stage('docker logout') {
            steps {
                sh 'docker logout'
            }
        }

        stage('deploy to k8s') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        sh '$zohovault run --exec="./scripts/k8sdeploy.sh"'
                    }
                }
            }
        }
    }

    post {
        always {
            sh './scripts/cleanup.sh'
        }
    }
}