const { spawnProcess } = require('child_process')
const { AutoLanguageClient } = require('atom-languageclient')

class SorbetLanguageClient extends AutoLanguageClient {
  getGrammarScopes() { return ['source.rb'] }
  getLanguageName() { return 'ruby' }
  getServerName() { return 'Sorbet' }

  startServerProcess(projectPath) {
    return spawnProcess(
      'docker',
      ['run', '--rm', '-i', '-v', `${projectPath}:/app:ro,z`, '-w', '/app', 'sorbet-language-server']
    )
  }
}

module.exports = new SorbetLanguageClient()
