'use server';

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function getSimilarEventsBySlug(slug: string) {
    try {
        await connectDB();

        const currentEvent = await Event.findOne({ slug });

        if (!currentEvent) return [];

        const similarEvents = await Event.find({
            slug: { $ne: slug },
            tags: { $in: currentEvent.tags },
        })
        .limit(3)
        .sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(similarEvents));

    } catch (error) {
        console.error(error);
        return [];
    }
}