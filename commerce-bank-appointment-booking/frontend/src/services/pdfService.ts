export interface PDFRequest {
  appointmentId: string;
  confirmationNumber: string;
  appointmentType: string;
  branch: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  timeSlot: {
    date: string;
    time: string;
  };
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const generatePDF = async (pdfData: PDFRequest): Promise<void> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}/appointments/generate-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pdfData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate PDF: ${errorText}`);
  }

  // Get the PDF blob from the response
  const blob = await response.blob();

  // Create a download link and trigger it
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `confirmation-${pdfData.confirmationNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};