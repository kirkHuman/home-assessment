pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci || npm install'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        // Do not use --with-deps here: it runs apt/yum with sudo and often prompts for
        // credentials on Jenkins. Install OS libs once on the agent image, or use a
        // Playwright Docker image (mcr.microsoft.com/playwright).
        sh 'npx playwright install chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test'
      }
    }

    stage('Generate Allure report') {
      when {
        expression { sh(script: 'test -d allure-results', returnStatus: true) == 0 }
      }
      steps {
        sh 'npx allure generate allure-results -o allure-report'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**', fingerprint: true, allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-results/**', fingerprint: true, allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-report/**', fingerprint: true, allowEmptyArchive: true

      script {
        if (sh(script: 'test -d allure-results', returnStatus: true) == 0) {
          allure([
            includeProperties: false,
            results: [[path: 'allure-results']]
          ])
        }
      }
    }
  }
}
