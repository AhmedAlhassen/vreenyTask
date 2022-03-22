class ProductController {

    async index(req, res) {
        return res.send('Product index!')
    }

}

module.exports = new ProductController()