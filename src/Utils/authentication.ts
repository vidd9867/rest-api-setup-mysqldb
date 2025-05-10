import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./encrypt";

// This is the middleware function that will be used to protect routes
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  try {
    const decoded = verifyToken(authHeader);
    // Add the decoded user to the request object so controllers can access it
    req.user = decoded;
    next(); // Proceed to the next middleware or controller
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: `Invalid token: ${error.message}` });
  }
};

// Keep the existing authentication function for backward compatibility
// export const authentication = (requestResponse: any) => {
//   const authHeader = requestResponse.headers.authorization;
//   if (!authHeader) return { message: "Unauthorized" }

//   const token = authHeader.split(" ")[1];
//     try {
//         const decoded = verifyToken(token); // Verify token and check expiry
//         return { message: 'User profile retrieved', user: decoded }
//     } catch (error: any) {
//         if (error.message === "Session expired") {
//             return { message: 'Session expired. Please log in again.', error: error }
//         }
//         return { message: `Invalid token ${error}` }
//     }
// };