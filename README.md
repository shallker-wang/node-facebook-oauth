node-facebook-oauth
==========

Facebook OAuth in Nodejs.

### Dummy steps
1, Install and require this package.
```javascript
var FacebookOAuth = require('facebook-oauth');
```

2, Create an instance with your Facebook APP id and secret.
```javascript
var fbAuth = new FacebookOAuth({
  'id': '508681709180920',
  'secret': 'f1b5d640ff6b2f980fdfd78e61672b61'
});
```

3, Set some options.
```javascript
fbAuth.set('redirect_uri', 'http://my-site.com/login/redirect');
/* optional below */
fbAuth.set('scope', 'email');
fbAuth.set('state', 'mystate');
fbAuth.set('response_type', 'code');  // 'code' or 'token'
fbAuth.set('display', 'popup');  // 'page', 'popup' or 'touch'
```

4, Generate a Facebook login url for user to login.
```javascript
var popup = '<a href="' + fbAuth.loginURL() + '">Facebook Login</a>'
```

5, After login, Facebook redirects user to your preset 'redirect_uri' with a code, exchange the code with an 'access_token'.
```javascript
fbAuth.exchangeAccessToken(code, function(result) {
  if (result.access_token) console.log('We got access token, now call the api with it.');
})
```

### Todo
* write a test
