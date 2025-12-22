// Flight status types
export type FlightStatus =
  | "scheduled"
  | "boarding"
  | "departed"
  | "in-flight"
  | "arrived"
  | "delayed"
  | "cancelled";

// API Response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Flight interface (matching schema)
export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date | string;
  arrivalTime: Date | string;
  status: FlightStatus;
  gate?: string | null;
  terminal?: string | null;
  aircraft?: string | null;
  notes?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// New flight input (for creating flights)
export interface NewFlightInput {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date | string;
  arrivalTime: Date | string;
  status?: FlightStatus;
  gate?: string;
  terminal?: string;
  aircraft?: string;
  notes?: string;
}

// Flight update input
export interface FlightUpdateInput {
  flightNumber?: string;
  airline?: string;
  origin?: string;
  destination?: string;
  departureTime?: Date | string;
  arrivalTime?: Date | string;
  status?: FlightStatus;
  gate?: string;
  terminal?: string;
  aircraft?: string;
  notes?: string;
}

// Health check response
export interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  environment?: string;
}
