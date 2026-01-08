import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import logAudit from "@/lib/audit.js"
import User from "@/models/auth/user.js"
import bcrypt from "bcryptjs"

