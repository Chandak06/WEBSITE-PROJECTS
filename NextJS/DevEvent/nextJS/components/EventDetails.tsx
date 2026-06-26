"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";
import BookEvent from "./BookEvent";

import { events as localEvents } from "@/lib/constants";

type Props = {
  slug: string;
};

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems = [] }: { agendaItems?: string[] }) => {
  if (agendaItems.length === 0) {
    return null;
  }

  return (
    <div className="agenda">
      <h2>Agenda</h2>

      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags = [] }: { tags?: string[] }) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag, index) => (
        <div className="pill" key={index}>
          {tag}
        </div>
      ))}
    </div>
  );
};

const EventDetails = ({ slug }: Props) => {
  type EventWithId = IEvent & {
    _id?: string;
  };

  const [event, setEvent] = useState<IEvent | null>(null);
  const [similarEvents, setSimilarEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`);

        if (!res.ok) {
          if (res.status === 404) {
            console.warn("API event not found. Falling back to local data.");

            const local = localEvents.find((e) => e.slug === slug);

            if (local) {
              setEvent(local as IEvent);

              setSimilarEvents(
                localEvents.filter((e) => e.slug !== slug) as IEvent[],
              );
            }
          } else {
            console.error("Failed to fetch event:", res.statusText);
          }

          return;
        }

        const json = await res.json();

        if (!json?.event) {
          console.error("No event returned from API");
          return;
        }

        setEvent(json.event);

        setSimilarEvents(
          localEvents.filter((e) => e.slug !== slug) as IEvent[],
        );
      } catch (err) {
        console.error("Error fetching event:", err);

        const local = localEvents.find((e) => e.slug === slug);

        if (local) {
          setEvent(local as IEvent);

          setSimilarEvents(
            localEvents.filter((e) => e.slug !== slug) as IEvent[],
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center py-20">
        Event not found
      </div>
    );
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>

        <p>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image || "/images/fallback.png"}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>

            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />

            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />

            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />

            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda || []} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>

            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent
              eventId={(event as EventWithId)._id ?? event.slug}
              slug={event.slug}
            />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>

        <div className="events">
          {similarEvents.length > 0 ? (
            similarEvents.map((similarEvent) => (
              <EventCard key={similarEvent.slug} {...similarEvent} />
            ))
          ) : (
            <p>No similar events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
