pipeline {
    agent any 
    environment {
        PORT = 3000
        CI = 'true'
        KUBE_CONFIG_PATH = '/home/ahesh-19540/.kube/config'
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
        stage('depoly docker container') {
            steps {
                sh './scripts/deploy.sh'
            }
        }
        stage('deployment verification') {
            steps {
                sleep(2)
                sh './scripts/verification.sh'
            }
        }
        stage('docker login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'a088496d-ae0a-4920-95ac-bd89d3ede7c2', passwordVariable: 'psword', usernameVariable: 'usrname')]) {
                    sh 'echo $psword | docker login -u $usrname --password-stdin'
                }
            }
        }

        stage('push image to docker hub') {
            steps {
                sh 'docker push aheshalagu/hello_server'
            }
        }

        stage('docker logout') {
            steps {
                sh 'docker logout'
            }
        }
        // stage('deploy to kubernetes') {
        //     steps{
        //         script{
        //             kubernetesDeploy(configs: 'deployment.yaml', kubeconfigId: '785c0bb2-699f-489f-b8f8-3ee15f468c98',  enableConfigSubstitution: false)
        //         }
        //     }
        // }
        // stage('Inject secrets') {
        //     steps {
        //         script {
        //             sh 'cp /home/ahesh-19540/.kube/config ${KUBE_CONFIG_PATH}'
        //         }
        //     }
        // }
        stage('k8s config') {
            steps {
                script{
                        withCredentials([file(credentialsId: 'kubeconfig', variable: 'kubeconfig')]) {
                            // sh 'mkdir -p ./kube'
                            // sh 'echo $kubeconfig > ./kube/config'
                            sh 'kubectl get deployments -n default --kubeconfig=${KUBE_CONFIG_PATH}'
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