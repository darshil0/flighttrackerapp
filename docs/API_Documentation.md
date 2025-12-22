# API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Flights](#flights)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

---

## Authentication

**Current Version (v1.0.0)**: No authentication required

⚠️ **Note**: Authentication will be required in v1.1.0. All endpoints are currently public.

**Planned (v1.1.0+)**:

- JWT Bearer token authentication
- API key authentication for programmatic access

---

## Endpoints

### Health Check

Check the API server health and status.

#### Get Health Status

```http
GET /api/health
```

**Response**

```json
{
  "status": "ok",
  "timestamp": "2024-11-24T12:34:56.789Z",
  "environment": "development"
}
```

**Status Codes**

- `200 OK`: Server is healthy
- `500 Internal Server Error`: Server is experiencing issues

---

### Flights

Manage flight information.

#### List All Flights

Retrieve all flights sorted by departure time (newest first).

```http
GET /api/flights
```

**Response**

```json
[
  {
    "id": 1,
    "flightNumber": "AA100",
    "airline": "American Airlines",
    "origin": "New York (JFK)",
    "destination": "Los Angeles (LAX)",
    "departureTime": "2024-11-25T10:00:00.000Z",
    "arrivalTime": "2024-11-25T13:30:00.000Z",
    "status": "scheduled",
    "gate": "A12",
    "terminal": "4",
    "aircraft": "Boeing 737",
    "notes": "On-time departure expected",
    "createdAt": "2024-11-24T08:00:00.000Z",
    "updatedAt": "2024-11-24T08:00:00.000Z"
  }
]
```

**Status Codes**

- `200 OK`: Flights retrieved successfully
- `500 Internal Server Error`: Database error

---

#### Get Single Flight

Retrieve a specific flight by ID.

```http
GET /api/flights/:id
```

**Parameters**

| Parameter | Type    | Location | Description |
| --------- | ------- | -------- | ----------- |
| `id`      | integer | path     | Flight ID   |

**Response**

```json
{
  "id": 1,
  "flightNumber": "AA100",
  "airline": "American Airlines",
  "origin": "New York (JFK)",
  "destination": "Los Angeles (LAX)",
  "departureTime": "2024-11-25T10:00:00.000Z",
  "arrivalTime": "2024-11-25T13:30:00.000Z",
  "status": "scheduled",
  "gate": "A12",
  "terminal": "4",
  "aircraft": "Boeing 737",
  "notes": "On-time departure expected",
  "createdAt": "2024-11-24T08:00:00.000Z",
  "updatedAt": "2024-11-24T08:00:00.000Z"
}
```

**Status Codes**

- `200 OK`: Flight found
- `400 Bad Request`: Invalid flight ID
- `404 Not Found`: Flight does not exist
- `500 Internal Server Error`: Database error

---

#### Create Flight

Create a new flight record.

```http
POST /api/flights
Content-Type: application/json
```

**Request Body**

```json
{
  "flightNumber": "BA200",
  "airline": "British Airways",
  "origin": "London (LHR)",
  "destination": "Paris (CDG)",
  "departureTime": "2024-11-25T14:00:00Z",
  "arrivalTime": "2024-11-25T15:30:00Z",
  "status": "scheduled",
  "gate": "B5",
  "terminal": "5",
  "aircraft": "Airbus A320",
  "notes": "Complimentary meal service"
}
```

**Required Fields**

- `flightNumber` (string, max 20 chars)
- `airline` (string, max 100 chars)
- `origin` (string, max 100 chars)
- `destination` (string, max 100 chars)
- `departureTime` (ISO 8601 datetime)
- `arrivalTime` (ISO 8601 datetime)

**Optional Fields**

- `status` (string, default: "scheduled")
- `gate` (string, max 10 chars)
- `terminal` (string, max 10 chars)
- `aircraft` (string, max 50 chars)
- `notes` (text)

**Response**

```json
{
  "id": 2,
  "flightNumber": "BA200",
  "airline": "British Airways",
  "origin": "London (LHR)",
  "destination": "Paris (CDG)",
  "departureTime": "2024-11-25T14:00:00.000Z",
  "arrivalTime": "2024-11-25T15:30:00.000Z",
  "status": "scheduled",
  "gate": "B5",
  "terminal": "5",
  "aircraft": "Airbus A320",
  "notes": "Complimentary meal service",
  "createdAt": "2024-11-24T10:15:00.000Z",
  "updatedAt": "2024-11-24T10:15:00.000Z"
}
```

**Status Codes**

- `201 Created`: Flight created successfully
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Database error

---

#### Update Flight

Update an existing flight's information.

```http
PUT /api/flights/:id
Content-Type: application/json
```

**Parameters**

| Parameter | Type    | Location | Description |
| --------- | ------- | -------- | ----------- |
| `id`      | integer | path     | Flight ID   |

**Request Body**

You can update any combination of fields. Only include fields you want to update.

```json
{
  "status": "boarding",
  "gate": "A14",
  "notes": "Gate changed - proceed to A14"
}
```

**Response**

```json
{
  "id": 1,
  "flightNumber": "AA100",
  "airline": "American Airlines",
  "origin": "New York (JFK)",
  "destination": "Los Angeles (LAX)",
  "departureTime": "2024-11-25T10:00:00.000Z",
  "arrivalTime": "2024-11-25T13:30:00.000Z",
  "status": "boarding",
  "gate": "A14",
  "terminal": "4",
  "aircraft": "Boeing 737",
  "notes": "Gate changed - proceed to A14",
  "createdAt": "2024-11-24T08:00:00.000Z",
  "updatedAt": "2024-11-24T11:30:00.000Z"
}
```

**Status Codes**

- `200 OK`: Flight updated successfully
- `400 Bad Request`: Invalid flight ID or request body
- `404 Not Found`: Flight does not exist
- `500 Internal Server Error`: Database error

---

#### Delete Flight

Delete a flight record.

```http
DELETE /api/flights/:id
```

**Parameters**

| Parameter | Type    | Location | Description |
| --------- | ------- | -------- | ----------- |
| `id`      | integer | path     | Flight ID   |

**Response**

```json
{
  "message": "Flight deleted successfully",
  "flight": {
    "id": 1,
    "flightNumber": "AA100",
    "airline": "American Airlines",
    "origin": "New York (JFK)",
    "destination": "Los Angeles (LAX)",
    "departureTime": "2024-11-25T10:00:00.000Z",
    "arrivalTime": "2024-11-25T13:30:00.000Z",
    "status": "cancelled",
    "gate": "A12",
    "terminal": "4",
    "aircraft": "Boeing 737",
    "notes": "Flight cancelled",
    "createdAt": "2024-11-24T08:00:00.000Z",
    "updatedAt": "2024-11-24T12:00:00.000Z"
  }
}
```

**Status Codes**

- `200 OK`: Flight deleted successfully
- `400 Bad Request`: Invalid flight ID
- `404 Not Found`: Flight does not exist
- `500 Internal Server Error`: Database error

---

## Data Models

### Flight

| Field           | Type        | Required | Description                    |
| --------------- | ----------- | -------- | ------------------------------ |
| `id`            | integer     | Auto     | Unique identifier              |
| `flightNumber`  | string(20)  | Yes      | Flight number (e.g., "AA100")  |
| `airline`       | string(100) | Yes      | Airline name                   |
| `origin`        | string(100) | Yes      | Departure location             |
| `destination`   | string(100) | Yes      | Arrival location               |
| `departureTime` | timestamp   | Yes      | Scheduled departure (ISO 8601) |
| `arrivalTime`   | timestamp   | Yes      | Scheduled arrival (ISO 8601)   |
| `status`        | string(50)  | Yes      | Flight status                  |
| `gate`          | string(10)  | No       | Gate number                    |
| `terminal`      | string(10)  | No       | Terminal                       |
| `aircraft`      | string(50)  | No       | Aircraft type                  |
| `notes`         | text        | No       | Additional notes               |
| `createdAt`     | timestamp   | Auto     | Record creation time           |
| `updatedAt`     | timestamp   | Auto     | Last update time               |

### Flight Status Values

| Status      | Description          |
| ----------- | -------------------- |
| `scheduled` | Flight is scheduled  |
| `boarding`  | Boarding in progress |
| `departed`  | Flight has departed  |
| `in-flight` | Currently in the air |
| `arrived`   | Flight has arrived   |
| `delayed`   | Flight is delayed    |
| `cancelled` | Flight is cancelled  |

---

## Error Handling

### Error Response Format

All errors return a JSON response with the following structure:

```json
{
  "error": "Error type or title",
  "message": "Detailed error message"
}
```

### Common Error Responses

#### 400 Bad Request

```json
{
  "error": "Invalid flight ID",
  "message": "Flight ID must be a number"
}
```

#### 404 Not Found

```json
{
  "error": "Flight not found",
  "message": "No flight found with ID 123"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Failed to fetch flights",
  "message": "Database connection error"
}
```

### HTTP Status Codes

| Code  | Description                              |
| ----- | ---------------------------------------- |
| `200` | OK - Request succeeded                   |
| `201` | Created - Resource created successfully  |
| `400` | Bad Request - Invalid request parameters |
| `404` | Not Found - Resource does not exist      |
| `500` | Internal Server Error - Server error     |

---

## Rate Limiting

**Current Version (v1.0.0)**: No rate limiting

**Planned (v1.1.0+)**:

- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

When rate limiting is implemented, responses will include headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1700842800
```

---

## Examples

### Using cURL

#### Get All Flights

```bash
curl -X GET http://localhost:5000/api/flights
```

#### Get Single Flight

```bash
curl -X GET http://localhost:5000/api/flights/1
```

#### Create Flight

```bash
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "DL300",
    "airline": "Delta Airlines",
    "origin": "Atlanta (ATL)",
    "destination": "Seattle (SEA)",
    "departureTime": "2024-11-25T16:00:00Z",
    "arrivalTime": "2024-11-25T19:30:00Z",
    "status": "scheduled"
  }'
```

#### Update Flight Status

```bash
curl -X PUT http://localhost:5000/api/flights/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "departed"
  }'
```

#### Delete Flight

```bash
curl -X DELETE http://localhost:5000/api/flights/1
```

---

### Using JavaScript/Fetch

#### Get All Flights

```javascript
const response = await fetch("http://localhost:5000/api/flights");
const flights = await response.json();
console.log(flights);
```

#### Create Flight

```javascript
const response = await fetch("http://localhost:5000/api/flights", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    flightNumber: "UA400",
    airline: "United Airlines",
    origin: "Chicago (ORD)",
    destination: "Denver (DEN)",
    departureTime: "2024-11-25T11:00:00Z",
    arrivalTime: "2024-11-25T13:00:00Z",
    status: "scheduled",
  }),
});

const flight = await response.json();
console.log("Created flight:", flight);
```

#### Update Flight

```javascript
const response = await fetch("http://localhost:5000/api/flights/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "boarding",
    gate: "C5",
  }),
});

const updatedFlight = await response.json();
console.log("Updated flight:", updatedFlight);
```

---

### Using Python/Requests

#### Get All Flights

```python
import requests

response = requests.get('http://localhost:5000/api/flights')
flights = response.json()
print(flights)
```

#### Create Flight

```python
import requests

flight_data = {
    'flightNumber': 'SW500',
    'airline': 'Southwest Airlines',
    'origin': 'Las Vegas (LAS)',
    'destination': 'Phoenix (PHX)',
    'departureTime': '2024-11-25T09:00:00Z',
    'arrivalTime': '2024-11-25T10:15:00Z',
    'status': 'scheduled'
}

response = requests.post(
    'http://localhost:5000/api/flights',
    json=flight_data
)

flight = response.json()
print('Created flight:', flight)
```

---

## Pagination (Future)

**Not yet implemented** - Will be added in v1.2.0

Planned query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort field (default: departureTime)
- `order` - Sort order: asc or desc (default: desc)

Example:

```
GET /api/flights?page=2&limit=50&sort=airline&order=asc
```

---

## Filtering (Future)

**Not yet implemented** - Will be added in v1.1.0

Planned query parameters:

- `status` - Filter by flight status
- `airline` - Filter by airline name
- `origin` - Filter by origin
- `destination` - Filter by destination
- `date` - Filter by departure date

Example:

```
GET /api/flights?status=scheduled&airline=Delta&date=2024-11-25
```

---

## WebSocket API (Future)

**Not yet implemented** - Will be added in v1.2.0

Real-time flight status updates via WebSocket connection.

Planned endpoint:

```
ws://localhost:5000/api/ws
```

---

## Versioning

The API follows semantic versioning. Breaking changes will result in a new API version.

Current version: **v1.0.0**

Future versions will be accessible via:

```
/api/v2/flights
/api/v3/flights
```

---

## Support

For API questions or issues:

- Open an issue on [GitHub](https://github.com/darshil0/flighttrackerapp/issues)
- Check existing issues for similar questions
- Review the main [README.md](README.md)

---

**Last Updated**: 2025-11-24  
**API Version**: 1.0.0
