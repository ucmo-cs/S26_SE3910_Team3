import type { Branch } from '../app/components/BranchSelectionStep';
import type { TimeSlot } from '../app/components/TimeSlotStep';
import type { UserInfo } from '../app/components/UserInfoStep';

export interface AppointmentRequest {
  appointmentType: string;
  branch: Branch;
  timeSlot: TimeSlot;
  userInfo: UserInfo;
}

export interface AppointmentResponse {
  id: string;
  confirmationNumber: string;
  appointmentType: string;
  branch: Branch;
  timeSlot: TimeSlot;
  userInfo: UserInfo;
  createdAt: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export const bookAppointment = async (
    appointmentData: AppointmentRequest
): Promise<AppointmentResponse> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to book appointment: ${errorText}`);
  }

  return response.json();
};

export const getAppointmentById = async (id: string): Promise<AppointmentResponse> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}/appointments/${id}`);

  if (!response.ok) {
    throw new Error(`Appointment not found: ${id}`);
  }

  return response.json();
};

export const cancelAppointment = async (id: string): Promise<void> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const response = await fetch(`${baseUrl}/appointments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel appointment: ${id}`);
  }
};