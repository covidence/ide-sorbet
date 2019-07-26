const cp = require('child_process')
const { AutoLanguageClient } = require('atom-languageclient')
const commandExistsSync = require('command-exists').sync

class SorbetLanguageClient extends AutoLanguageClient {
  getGrammarScopes() { return ['source.rb', 'source.ruby', 'source.ruby.rails'] }
  getLanguageName() { return 'ruby' }
  getServerName() { return 'sorbet' }

  startServerProcess() {
    return cp.spawn(this.command(), this.args())
  }

  command() {
    return this.commandParts()[0]
  }

  args() {
    let args = this.commandParts().slice(1)

    args.push('tc', '--lsp')
    if (atom.config.get('ide-sorbet.verbose')) {
      args.push('-v')
    }

    if (atom.config.get('ide-sorbet.experimentalFeatures')) {
      args.push('--enable-all-experimental-lsp-features')
    }

    if (!this.shouldEnableWatchman()) {
      args.push('--disable-watchman')
    }

    return args
  }

  commandParts() {
    return atom.config.get('ide-sorbet.sorbetCommand').split(' ')
  }

  shouldEnableWatchman() {
    if (atom.config.get('ide-sorbet.enableWatchman') == 'enable') {
      return true
    }

    if (atom.config.get('ide-sorbet.enableWatchman') == 'disable') {
      return false
    }

    return commandExistsSync('watchman')
  }
}

module.exports = new SorbetLanguageClient()
