export interface EmailRequest {
  appointmentId: string;
  email: string;
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

export interface EmailResponse {
  success: boolean;
  message: string;
  emailId?: string;
}

export const sendConfirmationEmail = async (
    emailData: EmailRequest
): Promise<EmailResponse> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}/appointments/send-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send confirmation email: ${errorText}`);
  }

  return response.json();
};