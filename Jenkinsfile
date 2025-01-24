pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'jsanthoshkiran/calculator-microservice'
        KUBE_CONTEXT = 'minikube' /*updated*/
        KUBECONFIG = credentials('Jenkins_ServiceAccount')
    }

    stages {
        stage('Build') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${env.DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        /*stage('Setup Kubeconfig') { 
            steps { 
                script { 
                    writeFile file: "${env.WORKSPACE}\\kubeconfig", text: "${KUBECONFIG}" 
                } 
                bat 'set KUBECONFIG=%WORKSPACE%\\kubeconfig' 
            } 
        }*/
        /*stage('Deploy to Minikube') {
            steps {*/
                /*script {
                    withCredentials([file(credentialsId: 'kubeconfig-credentials', variable: 'Jenkins_ServiceAccount')]) {
                        bat 'kubectl apply -f k8s/deployment.yml'
                        bat 'kubectl apply -f k8s/service.yml'
                    }
                }*/
         /*     bat 'minikube start'
                bat "for /f \"tokens=*\" %a in (\"minikube docker-env\") do %a"
                bat 'kubectl apply -f k8s/deployment.yml'
                bat 'kubectl apply -f k8s/service.yml'
            }
        }*/
        
        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("${env.DOCKER_IMAGE}:latest").run('-d -p 3000:3000 --name nodejs-ms-calculator')
                }
            }
        }

    }
}
