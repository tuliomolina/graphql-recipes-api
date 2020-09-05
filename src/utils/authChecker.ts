import jwt from "jsonwebtoken";

export const authChecker = ({ context }: any): boolean => {
  const req = context;
  try {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      return true;
    }
  } catch (error) {}

  return false;
};
