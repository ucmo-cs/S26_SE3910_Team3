const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Helper ──────────────────────────────────────────────────────────────────
function randomId(prefix) {
    return prefix + Math.random().toString(36).substring(2, 9).toUpperCase();
}

// ── 1. Book Appointment ─────────────────────────────────────────────────────
app.post("/api/appointments", (req, res) => {
    const { appointmentType, branch, timeSlot, userInfo } = req.body;

    if (!appointmentType || !branch || !timeSlot || !userInfo) {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Missing required fields",
        });
    }

    const appointment = {
        id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }),
        confirmationNumber: "BNK-" + randomId(""),
        appointmentType,
        branch,
        timeSlot,
        userInfo,
        createdAt: new Date().toISOString(),
        status: "CONFIRMED",
    };

    console.log(`✅ Appointment booked: ${appointment.confirmationNumber}`);
    res.status(201).json(appointment);
});

// ── 2. Send Confirmation Email ───────────────────────────────────────────────
app.post("/api/appointments/send-confirmation", (req, res) => {
    const { email, confirmationNumber } = req.body;

    if (!email || !confirmationNumber) {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Missing email or confirmationNumber",
        });
    }

    console.log(`📧 Email "sent" to ${email} for ${confirmationNumber}`);
    res.json({
        success: true,
        message: "Confirmation email sent successfully",
        emailId: "msg_" + randomId(""),
    });
});

// ── 3. Generate PDF ──────────────────────────────────────────────────────────
app.post("/api/appointments/generate-pdf", (req, res) => {
    const { confirmationNumber } = req.body;

    if (!confirmationNumber) {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Missing confirmationNumber",
        });
    }

    // Return a minimal valid PDF so the browser can actually download something
    const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>/Contents 4 0 R>>endobj
4 0 obj<</Length 44>>
stream
BT /F1 18 Tf 72 720 Td (${confirmationNumber}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000266 00000 n
trailer<</Size 5/Root 1 0 R>>
startxref
360
%%EOF`;

    console.log(`📄 PDF generated for ${confirmationNumber}`);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="confirmation-${confirmationNumber}.pdf"`
    );
    res.send(Buffer.from(pdfContent));
});

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`\n🏦 Commerce Bank mock server running at http://localhost:${PORT}`);
    console.log("   Endpoints:");
    console.log("   POST /api/appointments");
    console.log("   POST /api/appointments/send-confirmation");
    console.log("   POST /api/appointments/generate-pdf\n");
});