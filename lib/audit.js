import AuditLog from "@/models/auth/auditlog";
import dbConnect from "@/lib/db";

export default async function logAudit({ user, action, metadata, ipAddress }) {
    try {
        await dbConnect();
        await AuditLog.create({
            user,
            action,
            metadata,
            ipAddress
        });
    }
    catch (error) {
        console.error("Failed to log audit:", error)
    }
}