class PageController {

    home(req, res) {
        throw new Error('An error happened')

        res.send('Home page. Controller.')
    }

    about(req, res) {
        res.send('About page.')
    }

    contact(req, res) {
        res.send('Contact page.')
    }

}

module.exports = new PageController()