function AuthInterceptor(AuthTokenFactory) {
  return {
    request: addToken
  }

  function addToken(config) {
    var token = AuthTokenFactory.getToken();

    if (token) {
      config.header = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }
}
