export const getSuggestedUser = async (req, res) => {
  try {
    let currentUser = await User.findById(req.userId).select("connection");

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    let suggestedUsers = await User.find({
      _id: {
        $ne: req.userId,
        $nin: currentUser.connection,
      },
    }).select("-password");

    return res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `suggestedUser error ${error}` });
  }
};
