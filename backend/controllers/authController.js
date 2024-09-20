const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ShopUser = require("../models/shopUser");
const Shop = require("../models/shop");
const UserType = require("../models/userType");
const { sendEmail } = require("./mailSend");

// Signup route
module.exports.adminRegister = async (req, res) => {
  try {
    if (!req.body) throw new Error("You must provide a payload");
    if (!req.body.username) throw new Error("You must provide a username");
    if (!req.body.firstName) throw new Error("You must provide a first name");
    if (!req.body.lastName) throw new Error("You must provide a last name");
    if (!req.body.email) throw new Error("You must provide an email address");
    if (!req.body.password) throw new Error("You must provide a password");
    if (!req.body.phone) throw new Error("You must provide a phone number");

    const userType = await UserType.findOne({ name: "ADMIN" });
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (!existingUser) {
      const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userType: userType._id,
      });

      const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN);

      sendEmail(
        req.body.email,
        req.body.username,
        "Successful registration",
        `<h4>Registration Successful</h4>
          <p>Admin registration was successfully done</p>
          <a href="${process.env.FRONTEND_URL}/email-verified?token=${token}">${process.env.FRONTEND_URL}/email-verified?token=${token}</a>
        `,
        "Admin registration was successfully done"
      )
        .then(async (response) => {
          await newUser.save();
          res.status(201).json({
            message: "Admin created successfully",
            response,
          });
        })
        .catch(async (err) => {
          console.log(err);
          await newUser.save();
          res.status(201).json({
            message:
              "Admin created successfully, but could not send verification email",
          });

          // res.status(500).json({
          //   error: err.message,
          // });
        });
    } else {
      res.status(400).json({
        error: "An admin with this account already exists",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// verify register route
module.exports.verifyRegister = async (req, res) => {
  try {
    if (!req.query.token) throw new Error("You must provide a token");

    const decodedToken = jwt.decode(req.query.token);
    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      user.isVerified = true;

      await user.save();

      res.status(201).json({
        message: "Admin verified successfully",
      });
    } else {
      res.status(400).json({
        error: "An admin with this account does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Signup to shop
module.exports.registerToShop = async (req, res) => {
  try {
    if (!req.body) throw new Error("You must provide a payload");
    if (!req.body.firstName) throw new Error("You must provide a first name");
    if (!req.body.lastName) throw new Error("You must provide a last name");
    if (!req.body.email) throw new Error("You must provide an email address");
    if (!req.body.password) throw new Error("You must provide a password");
    if (!req.body.phone) throw new Error("You must provide a phone number");
    if (!req.params.shopId) throw new Error("You must select a shop");

    const shopId = req.params.shopId;
    const userType = await UserType.findOne({ name: "USER" });
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    const shop = await Shop.findOne({ _id: shopId });

    let user;

    if (!existingUser) {
      user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userType: userType._id,
        imageUrl: req.body.imageUrl,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      });

      await sendEmail(
        req.body.email,
        req.body.username,
        "Successful registration",
        `<p>Welcome ${req.body.username}! User registration was successfully done</p>
        <a href="${process.env.FRONTEND_URL}/email-confirmation?token=${token}">${process.env.FRONTEND_URL}/verify-registration?token=${token}</a>
        `,
        `Welcome ${req.body.username}! User registration was successfully done`
      );
    } else {
      user = existingUser;
    }

    const isUserPresentInShop = await ShopUser.findOne({ user: user._id });

    console.log(isUserPresentInShop);

    if (isUserPresentInShop)
      throw new Error("User has an account with this shop");

    console.log("Here");
    const shopUser = new ShopUser({
      user: user._id,
      shop: shopId,
      userType: userType._id,
    });

    await shopUser.save();

    await sendEmail(
      req.body.email,
      req.body.username,
      "Successful registration to shop",
      `<p>Welcome ${req.body.username}! User registration to shop ${shop.name} was successfully done</p>`,
      `Welcome ${req.body.username}! User registration to shop ${shop.name} was successfully done`
    );

    res.status(201).json({
      message: "User account and shop registration completed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Login route
module.exports.adminLogin = async (req, res) => {
  try {
    if (!req.body) throw new Error("You must provide a payload");
    if (!req.body?.email) throw new Error("You must provide an email address");
    if (!req.body?.password) throw new Error("You must provide a password");

    const user = await User.findOne({ email: req.body.email }).populate(
      "userType"
    );

    console.log(user);

    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_TOKEN
    );

    res.status(200).send({
      token,
      user: {
        username: user.username,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login route
module.exports.loginToShop = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("You must provide an email address");
    if (!password) throw new Error("You must provide a password");

    const shopId = req.params.shopId;
    const user = await User.findOne({ email }).populate("userType");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const shopUser = await ShopUser.findOne({ user: user._id, shop: shopId });

    if (!shopUser) {
      return res
        .status(401)
        .json({ message: "You do not have an account with this shop" });
    }

    // Generate access token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType, shop: shopUser.shop },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    // // Generate refresh token
    // const refreshToken = jwt.sign(
    //   { userId: user._id, shop: shopUser.shop },
    //   process.env.JWT_REFRESH_TOKEN,
    //   { expiresIn: "14d" } // Refresh token valid for 7 days
    // );

    res.status(200).json({
      token,
      // refreshToken,
      user: {
        username: user.username,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        _id: user._id,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }
  console.log("trying");
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN);

    // Optionally, check if the user still exists or if they are still valid for the shop
    const user = await User.findById(decoded.userId).populate("userType");
    const shopUser = await ShopUser.findOne({
      user: user._id,
      shop: decoded.shop,
    });

    if (!user || !shopUser) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, userType: user.userType, shop: shopUser.shop },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
