import type { Request, Response } from "express";
import { auth } from "../lib/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }

    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!session) {
      return res.status(401).json({ 
        error: "Invalid email or password" 
      });
    }

    res.json({
      message: "Login successful",
      user: session.user,
      session: session.session,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Login failed",
      message: error.message || "Internal server error"
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await auth.api.signOut({
      headers: req.headers,
    });

    res.json({ message: "Logout successful" });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      error: "Logout failed",
      message: error.message || "Internal server error"
    });
  }
};
 
export const getProfile = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({
      user: session.user,
      session: session.session,
    });
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({ 
      error: "Failed to get profile",
      message: error.message || "Internal server error"
    });
  }
};