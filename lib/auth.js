import { cookies } from "next/headers";
import Session from "@/models/auth/session";
import dbConnect from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "session_token";
