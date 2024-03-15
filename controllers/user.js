import User from "../models/User.js";

// export const createUser = async (req, res, next) => {
//   const newUser = new User(req.body);
//   try {
//     const saveUser = await newUser.save();
//     res.status(200).json(saveUser);
//   } catch (err) {
//     next(err);
//   }
// };

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  // // Check error when id not match or not found
  // const failed = true;
  // // const err = new Error();
  // // err.status = 404;
  // // err.message = "Sorry not found!.";
  // if (failed) {
  //   return next(createError(401, "You are not authenticated!."));
  // }

  try {
    const users = await User.find(req.params.id);
    // const Users = await User.findById("dfasdfasdf"); // check error when id not match

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getCountUsers = async (req, res, next) => {
  try {
    const countUsers = await User.countDocuments({ isAdmin: false });
    res.status(200).json(countUsers);
  } catch (err) {
    next(err);
  }
};
