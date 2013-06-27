/* @author shallker.wang@profero.com */

var https = require('https'),
    param = require('../helper/param.js');

/* Facebook OAuth */
var FacebookOAuth = (function() {
  function constructor(app) {
    this.app = app;
  }

  constructor.prototype = (function() {
    this.sets = {}
    this.url = {
      login: 'https://www.facebook.com/dialog/oauth',
      token: 'https://graph.facebook.com/oauth/access_token'
    }

    /* get login url */
    this.loginURL = function() {
      param.set('client_id', this.app.id);
      param.set('redirect_uri', this.sets.redirect_uri);
      this.sets.scope && param.set('scope', this.sets.scope);
      this.sets.state && param.set('state', this.sets.state);
      this.sets.display && param.set('display', this.sets.display);
      this.sets.response_type && param.set('response_type', this.sets.response_type);
      return this.url.login + '?' + param.build();
    }

    /* get access token exchange url */
    this.tokenURL = function(code) {
      param
        .set('client_id', this.app.id)
        .set('client_secret', this.app.secret)
        .set('redirect_uri', this.sets.redirect_uri)
        .set('code', code);
      return this.url.token + '?' + param.build();
    }

    /* exchange code with access token */
    this.exchangeAccessToken = function(code, onExchange) {
      https.get(this.tokenURL(code), function(res) {
        res.on('data', function(buffer) {
          var result = param.parse(buffer.toString());
          onExchange(result);
        })
      }).on('error', function(e) {
        throw 'getAccessToken: ' + e.message;
      })
    }

    this.authState = function(state) {
      return (state === this.sets.state);
    }

    this.set = function(name, value) {
      this.sets[name] = value;
    }

    return this;
  }).call({})

  return constructor;
})();

module.exports = FacebookOAuth;
