"use server";

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

interface CreateBookingParams {
  eventId: string;
  email: string;
}

export async function createBooking({
  eventId,
  email,
}: CreateBookingParams) {
  try {
    await connectDB();

    const existingBooking = await Booking.findOne({
      eventId,
      email,
    });

    if (existingBooking) {
      return {
        success: false,
        message: "You already booked this event",
      };
    }

    const booking = await Booking.create({
      eventId,
      email,
    });

    return {
      success: true,
      booking: JSON.parse(JSON.stringify(booking)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
