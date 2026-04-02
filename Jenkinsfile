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
        // Required on fresh agents; only Chromium matches playwright.config projects
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Generate Allure report') {
      when {
        expression { sh(script: 'test -d allure-results', returnStatus: true) == 0 }
      }
      steps {
        // Allure 3: no --clean flag (removed vs Allure 2)
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
