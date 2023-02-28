import jwt from "jsonwebtoken";
import csurf from "csurf";

const { sign, verify } = jwt;

export const csurfProtection = csurf({ cookie: true });

export const createToken = (user) => {
  const authToken = sign(
    { _id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "30d" }
  );
  return authToken;
};

export const employeeAuthValidation = (req, res, next) => {
  const authTokenCookie = req.cookies["authToken"];
  const role = authTokenCookie.role;
  const authToken = authTokenCookie.authToken;
  if (role === "Employee") {
    if (!authToken) {
      res.status(400).json("no auth for this action");
    }
    const decodedToken = verify(authToken, process.env.SECRET_KEY);
    if (decodedToken.role !== "Employee") {
      res.status(400).json("no auth for this action");
    }
    next();
  }

  next();
};

export const borrowerAuthValidation = (req, res, next) => {
  const authTokenCookie = req.cookies["authToken"];
  const role = authTokenCookie.role;
  const authToken = authTokenCookie.authToken;
  if (role === "Borrower") {
    if (!authToken) {
      res.status(400).json("no auth for this action");
    }
    const decodedToken = verify(authToken, process.env.SECRET_KEY);
    if (decodedToken.role !== "Borrower") {
      res.status(400).json("no auth for this action");
    }
    next();
  }

  next();
};
