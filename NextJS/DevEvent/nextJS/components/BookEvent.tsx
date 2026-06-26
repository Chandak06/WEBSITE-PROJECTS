"use client";

import { useState } from "react";

import posthog from "posthog-js";

import { createBooking } from "@/lib/booking.actions";

type Props = {
  eventId: string;
  slug: string;
};

const BookEvent = ({ eventId, slug }: Props) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email.trim()) {
        console.error("Email is required");
        return;
      }

      if (!eventId) {
        console.error("Missing eventId");
        return;
      }

      setLoading(true);

      const result = await createBooking({
        eventId,
        email,
      });

      if (result.success) {
        setSubmitted(true);

        posthog.capture("event_booked", {
          eventId,
          slug,
          email,
        });
      } else {
        console.error(
          "Booking creation failed:",
          result.message || "Unknown error"
        );

        posthog.captureException(
          new Error(result.message || "Booking creation failed")
        );
      }
    } catch (error) {
      console.error("Booking error:", error);

      posthog.captureException(
        error instanceof Error
          ? error
          : new Error("Unknown booking error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">
          Thank you for signing up!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email address"
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            className="button-submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;