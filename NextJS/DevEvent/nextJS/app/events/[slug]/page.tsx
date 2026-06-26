import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const EventDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails slug={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;