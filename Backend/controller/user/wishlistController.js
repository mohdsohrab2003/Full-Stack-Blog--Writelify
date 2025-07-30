import User from "../../model/users.js";
export const addWishlist = async (req, res) => {
  const { blogId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.wishlist.includes(blogId)) {
      user.wishlist.push(blogId);
      await user.save();
    }
    res.json({ success: true, message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeWishlist = async (req, res) => {
  const { blogId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== blogId);
    await user.save();
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
