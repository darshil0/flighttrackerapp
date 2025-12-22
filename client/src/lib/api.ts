import type {
  Flight,
  NewFlightInput,
  FlightUpdateInput,
  HealthCheckResponse,
} from "../../../shared/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message ||
        error.error ||
        `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response.statusText,
    );
  }
  return response.json();
}

// Health check
export async function checkHealth(): Promise<HealthCheckResponse> {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return handleResponse<HealthCheckResponse>(response);
}

// Get all flights
export async function fetchFlights(): Promise<Flight[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights`);
    return handleResponse<Flight[]>(response);
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}

// Get single flight
export async function fetchFlight(id: number): Promise<Flight> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights/${id}`);
    return handleResponse<Flight>(response);
  } catch (error) {
    console.error(`Error fetching flight ${id}:`, error);
    throw error;
  }
}

// Create new flight
export async function createFlight(flight: NewFlightInput): Promise<Flight> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flight),
    });
    return handleResponse<Flight>(response);
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
}

// Update flight
export async function updateFlight(
  id: number,
  updates: FlightUpdateInput,
): Promise<Flight> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<Flight>(response);
  } catch (error) {
    console.error(`Error updating flight ${id}:`, error);
    throw error;
  }
}

// Delete flight
export async function deleteFlight(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights/${id}`, {
      method: "DELETE",
    });
    await handleResponse(response);
  } catch (error) {
    console.error(`Error deleting flight ${id}:`, error);
    throw error;
  }
}

export { ApiError };
