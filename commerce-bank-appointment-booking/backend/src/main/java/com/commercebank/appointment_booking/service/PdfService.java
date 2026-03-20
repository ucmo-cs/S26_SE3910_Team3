package com.commercebank.appointment_booking.service;

import com.commercebank.appointment_booking.dto.PdfRequest;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    private static final DeviceRgb GREEN = new DeviceRgb(22, 163, 74);
    private static final DeviceRgb LIGHT_GREEN = new DeviceRgb(240, 253, 244);
    private static final DeviceRgb GRAY = new DeviceRgb(107, 114, 128);

    public byte[] generateAppointmentPdf(PdfRequest request) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // ── Header ──────────────────────────────────────────────────────────
        Paragraph header = new Paragraph("COMMERCE BANK")
                .setFontSize(24)
                .setBold()
                .setFontColor(ColorConstants.WHITE)
                .setBackgroundColor(GREEN)
                .setTextAlignment(TextAlignment.CENTER)
                .setPadding(15);
        document.add(header);

        // ── Title ────────────────────────────────────────────────────────────
        document.add(new Paragraph("Appointment Confirmation")
                .setFontSize(18)
                .setBold()
                .setFontColor(GREEN)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(20));

        // ── Confirmation Number ──────────────────────────────────────────────
        document.add(new Paragraph(request.getConfirmationNumber())
                .setFontSize(28)
                .setBold()
                .setFontColor(GREEN)
                .setTextAlignment(TextAlignment.CENTER)
                .setBackgroundColor(LIGHT_GREEN)
                .setPadding(10)
                .setMarginBottom(20));

        // ── Appointment Details Table ────────────────────────────────────────
        document.add(new Paragraph("Appointment Details")
                .setFontSize(14)
                .setBold()
                .setFontColor(GREEN)
                .setMarginBottom(5));

        Table apptTable = new Table(UnitValue.createPercentArray(new float[]{40, 60}))
                .setWidth(UnitValue.createPercentValue(100));

        addTableRow(apptTable, "Appointment Type", request.getAppointmentType(), true);
        addTableRow(apptTable, "Date", request.getTimeSlot().getDate(), false);
        addTableRow(apptTable, "Time", request.getTimeSlot().getTime(), true);
        addTableRow(apptTable, "Duration", "1 Hour", false);
        document.add(apptTable);

        // ── Branch Information ───────────────────────────────────────────────
        document.add(new Paragraph("Branch Information")
                .setFontSize(14)
                .setBold()
                .setFontColor(GREEN)
                .setMarginTop(15)
                .setMarginBottom(5));

        Table branchTable = new Table(UnitValue.createPercentArray(new float[]{40, 60}))
                .setWidth(UnitValue.createPercentValue(100));

        addTableRow(branchTable, "Branch Name", request.getBranch().getName(), true);
        addTableRow(branchTable, "Address", request.getBranch().getAddress() + ", "
                + request.getBranch().getCity() + ", "
                + request.getBranch().getState() + " "
                + request.getBranch().getZip(), false);
        addTableRow(branchTable, "Phone", request.getBranch().getPhone(), true);
        document.add(branchTable);

        // ── Customer Information ─────────────────────────────────────────────
        document.add(new Paragraph("Customer Information")
                .setFontSize(14)
                .setBold()
                .setFontColor(GREEN)
                .setMarginTop(15)
                .setMarginBottom(5));

        Table customerTable = new Table(UnitValue.createPercentArray(new float[]{40, 60}))
                .setWidth(UnitValue.createPercentValue(100));

        addTableRow(customerTable, "Name", request.getUserInfo().getName(), true);
        addTableRow(customerTable, "Email", request.getUserInfo().getEmail(), false);
        addTableRow(customerTable, "Phone", request.getUserInfo().getPhone(), true);
        document.add(customerTable);

        // ── Important Notes ──────────────────────────────────────────────────
        document.add(new Paragraph("Important Notes")
                .setFontSize(14)
                .setBold()
                .setFontColor(GREEN)
                .setMarginTop(15)
                .setMarginBottom(5));

        document.add(new Paragraph("• Please arrive 5 minutes before your appointment.")
                .setFontSize(11));
        document.add(new Paragraph("• Bring a valid government-issued photo ID.")
                .setFontSize(11));
        document.add(new Paragraph("• To reschedule, call us at (816) 555-0000.")
                .setFontSize(11));

        // ── Footer ───────────────────────────────────────────────────────────
        document.add(new Paragraph("Commerce Bank | 1200 Main Street, Kansas City, MO | (816) 555-0000")
                .setFontSize(9)
                .setFontColor(GRAY)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(30));

        document.close();
        return outputStream.toByteArray();
    }

    private void addTableRow(Table table, String label, String value, boolean shaded) {
        DeviceRgb bg = shaded ? LIGHT_GREEN : new DeviceRgb(255, 255, 255);

        table.addCell(new Cell()
                .add(new Paragraph(label).setBold())
                .setBackgroundColor(bg)
                .setPadding(8));

        table.addCell(new Cell()
                .add(new Paragraph(value != null ? value : ""))
                .setBackgroundColor(bg)
                .setPadding(8));
    }
}