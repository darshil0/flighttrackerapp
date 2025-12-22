import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: varchar("flight_number", { length: 20 }).notNull(),
  airline: varchar("airline", { length: 100 }).notNull(),
  origin: varchar("origin", { length: 100 }).notNull(),
  destination: varchar("destination", { length: 100 }).notNull(),
  departureTime: timestamp("departure_time", { withTimezone: true }).notNull(),
  arrivalTime: timestamp("arrival_time", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("scheduled"),
  gate: varchar("gate", { length: 10 }),
  terminal: varchar("terminal", { length: 10 }),
  aircraft: varchar("aircraft", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Type inference
export type Flight = typeof flights.$inferSelect;
export type NewFlight = typeof flights.$inferInsert;
