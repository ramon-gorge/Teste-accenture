import './api_commands'
import './gui_commands'
import '@faker-js/faker'
import 'cypress-plugin-api'

Cypress.on('uncaught:exception', (err) => {
  // wroklaround para ignorar erros de terceiros (ex: google-analytics)
  if (err && typeof err.message === 'string') {
    if (err.message.includes('Script error') || !err.stack) {
      return false; // não falhar o teste por conta de erros de terceiros
    }
  }
  // falhar o teste para outros tipos de erros
  return true;
});