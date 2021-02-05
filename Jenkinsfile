pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Hello World"'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -lah
                '''
            }
        }
    }
    stages {
            stage('拉去最新代码') {
                steps {
                    sh 'git pull up'
                }
            }
        }
}