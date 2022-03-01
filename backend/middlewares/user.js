import User from '../models/user.js';

const existingUser = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  return existingUser
    ? res.status(400).send({ message: 'The user is already registered' })
    : next();
};

const activeStatus = async (req, res, next) => {
  if (req.body.email) {
    const activeUser = await User.findOne({ email: req.body.email });
    return !activeUser.dbStatus
      ? res.status(400).send({ message: 'The user is not active' })
      : next();
  } else if (req.params._id) {
    const activeUser = await User.findById(req.params._id);
    return !activeUser.dbStatus
      ? res.status(400).send({ message: 'The user is not active' })
      : next();
  } else if (req.params.email) {
    const activeUser = await User.findOne({ email: req.params.email });
    return !activeUser.dbStatus
      ? res.status(400).send({ message: 'The user is not active' })
      : next();
  }
};
export { existingUser, activeStatus };
