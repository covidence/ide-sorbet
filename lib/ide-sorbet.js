const cp = require('child_process')
const { AutoLanguageClient } = require('atom-languageclient')

class SorbetLanguageClient extends AutoLanguageClient {
  getGrammarScopes() { return ['source.rb', 'source.ruby', 'source.ruby.rails'] }
  getLanguageName() { return 'ruby' }
  getServerName() { return 'sorbet' }

  startServerProcess() {
    return cp.spawn(
      'bundle',
      ['exec', 'srb', 'tc', '--lsp', '-v', '--enable-all-experimental-lsp-features']
    )
  }
}

module.exports = new SorbetLanguageClient()
