

class SiteController {
  // [GET] /
  index(req, res) {
    res.render('home');
  }
}

export default new SiteController();
