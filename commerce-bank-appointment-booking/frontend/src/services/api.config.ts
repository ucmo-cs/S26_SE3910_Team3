/**
 * API Configuration for Spring Boot Backend
 * 
 * Update the API_BASE_URL to match your Spring Boot server address
 * Development: http://localhost:8080/api
 * Production: https://your-domain.com/api
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Appointment endpoints
  APPOINTMENTS: '/appointments',
  APPOINTMENT_BY_ID: (id: string) => `/appointments/${id}`,
  
  // Email endpoints
  SEND_CONFIRMATION_EMAIL: '/appointments/send-confirmation',
  
  // PDF endpoints
  GENERATE_PDF: '/appointments/generate-pdf',
  
  // Branch endpoints
  BRANCHES: '/branches',
  BRANCHES_BY_ZIP: (zip: string) => `/branches/search?zip=${zip}`,
  
  // Time slots endpoints
  AVAILABLE_SLOTS: (branchId: string, date: string) => `/timeslots/available?branchId=${branchId}&date=${date}`,
};

/**
 * Common headers for API requests
 */
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  // Add authentication headers here if needed
  // 'Authorization': `Bearer ${getToken()}`
});

/**
 * Handle API response errors
 */
export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unexpected error occurred'
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response;
};
