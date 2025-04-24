

class SiteController {
  // [GET] /
  index(req, res) {
    res.json({ message: "Home Page" });
  }
}

export default new SiteController();
