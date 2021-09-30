let APIURL = ''

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break

    case 'meb-fight-game-app.herokuapp.com':
        APIURL = 'https://meb-fight-game-app.herokuapp.com'
        break
}

export default APIURL