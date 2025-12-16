import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFlights } from './lib/api';
import type { Flight, NewFlightInput } from '../../shared/types';
import { useMutation } from '@tanstack/react-query';
import { createFlight, updateFlight, deleteFlight } from './lib/api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [newFlight, setNewFlight] = useState<NewFlightInput>({
    flightNumber: '',
    airline: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    status: 'scheduled',
  });
  const queryClient = useQueryClient();

  // Fetch all flights
  const {
    data: flights,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['flights'],
    queryFn: fetchFlights,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Create flight mutation
  const createFlightMutation = useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });

  // Update flight mutation
  const updateFlightMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: NewFlightInput }) =>
      updateFlight(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });

  // Delete flight mutation
  const deleteFlightMutation = useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      deleteFlightMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingFlight) {
      updateFlightMutation.mutate(
        { id: editingFlight.id, updates: newFlight },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingFlight(null);
            setNewFlight({
              flightNumber: '',
              airline: '',
              origin: '',
              destination: '',
              departureTime: '',
              arrivalTime: '',
              status: 'scheduled',
            });
          },
        }
      );
    } else {
      createFlightMutation.mutate(newFlight, {
        onSuccess: () => {
          setIsModalOpen(false);
          setNewFlight({
            flightNumber: '',
            airline: '',
            origin: '',
            destination: '',
            departureTime: '',
            arrivalTime: '',
            status: 'scheduled',
          });
        },
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'boarding':
        return 'bg-yellow-100 text-yellow-800';
      case 'departed':
      case 'in-flight':
        return 'bg-green-100 text-green-800';
      case 'arrived':
        return 'bg-gray-100 text-gray-800';
      case 'delayed':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading flights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Flights</h2>
          <p className="text-red-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load flights'}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingFlight ? 'Edit Flight' : 'New Flight'}
            </h2>
            <form
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Flight Number"
                  value={newFlight.flightNumber}
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, flightNumber: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Airline"
                  value={newFlight.airline}
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, airline: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Origin"
                  value={newFlight.origin}
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, origin: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Destination"
                  value={newFlight.destination}
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, destination: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="datetime-local"
                  placeholder="Departure Time"
                  value={
                    newFlight.departureTime
                      ? new Date(newFlight.departureTime).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, departureTime: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="datetime-local"
                  placeholder="Arrival Time"
                  value={
                    newFlight.arrivalTime
                      ? new Date(newFlight.arrivalTime).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, arrivalTime: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  {editingFlight ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flight Tracker</h1>
              <p className="text-gray-600 mt-1">Real-time flight information</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Flight
              </button>
              <button
                onClick={() => refetch()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!flights || flights.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No flights found</h3>
            <p className="mt-2 text-gray-600">There are no flights in the system yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {flights.map((flight: Flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {flight.flightNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          flight.status
                        )}`}
                      >
                        {flight.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{flight.airline}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">From</p>
                        <p className="font-semibold text-gray-900">{flight.origin}</p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                      <div>
                        <p className="text-gray-500">To</p>
                        <p className="font-semibold text-gray-900">{flight.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <p className="text-gray-500 text-sm">Departure</p>
                      <p className="font-semibold text-gray-900">
                        {formatTime(flight.departureTime)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(flight.departureTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Arrival</p>
                      <p className="font-semibold text-gray-900">
                        {formatTime(flight.arrivalTime)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(flight.arrivalTime)}
                      </p>
                    </div>
                  </div>
                </div>
                {(flight.gate || flight.terminal || flight.aircraft) && (
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4 text-sm">
                    {flight.gate && (
                      <div>
                        <span className="text-gray-500">Gate:</span>{' '}
                        <span className="font-semibold text-gray-900">{flight.gate}</span>
                      </div>
                    )}
                    {flight.terminal && (
                      <div>
                        <span className="text-gray-500">Terminal:</span>{' '}
                        <span className="font-semibold text-gray-900">{flight.terminal}</span>
                      </div>
                    )}
                    {flight.aircraft && (
                      <div>
                        <span className="text-gray-500">Aircraft:</span>{' '}
                        <span className="font-semibold text-gray-900">{flight.aircraft}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingFlight(flight);
                      setNewFlight({
                        ...flight,
                        departureTime: new Date(flight.departureTime)
                          .toISOString()
                          .slice(0, 16),
                        arrivalTime: new Date(flight.arrivalTime)
                          .toISOString()
                          .slice(0, 16),
                        gate: flight.gate ?? '',
                        terminal: flight.terminal ?? '',
                        aircraft: flight.aircraft ?? '',
                        notes: flight.notes ?? '',
                      });
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
