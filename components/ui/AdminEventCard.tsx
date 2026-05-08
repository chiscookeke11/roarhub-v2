"use client";

import { EventItem } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { formatListDate } from "@/utils/events";
import { SetStateAction } from "react";

type EventCardProps = {
    data: EventItem;
    showOptionsIndex?: string | null;
    setShowOptionsIndex?: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedIndex?: React.Dispatch<SetStateAction<string>>
    setShowEditBlogModal?: React.Dispatch<SetStateAction<boolean>>
    setConfirmDeleteModal?: React.Dispatch<SetStateAction<boolean>>
};

export default function AdminEventCard({ data: event, showOptionsIndex, setConfirmDeleteModal,
     setSelectedIndex, setShowEditBlogModal, setShowOptionsIndex }: EventCardProps) {

    return (
        <div
            className="h-full w-full rounded-2xl border border-white/10 bg-gray-700 p-3 ">
            <div className="relative h-60 w-full overflow-hidden rounded-xl bg-slate-700">
                <Image src={event.image} alt={event.title} fill className="object-cover object-center" />
            </div>

            <div className="mt-4 flex flex-col gap-3">
                <p className="text-sm font-medium text-blue-200">{formatListDate(event.date)}</p>
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <p className="text-sm leading-relaxed text-slate-200">{event.excerpt}</p>

                <div className="w-full  flex items-center justify-center gap-6 " >

                    <Link
                        href={`/events/${event.slug}`}
                        className="mt-2 inline-flex w-fit rounded-sm bg-[#0e6efd] px-4 py-2 text-sm
                         font-semibold text-white transition-colors hover:bg-[#0b5ed7]"
                    >
                        View event
                    </Link>

                    <button
                        onClick={() => {
                            setSelectedIndex?.(String(event.id) ?? "");
                            if (setShowEditBlogModal) {
                                setShowEditBlogModal(true)
                            };
                        }}
                        className="mt-2 cursor-pointer inline-flex w-fit rounded-sm bg-[#0e6efd] px-4 py-2
                     text-sm font-semibold text-white transition-colors hover:bg-[#0b5ed7]"
                    >Update</button>


                    <button
                        onClick={() => {
                            setSelectedIndex?.(String(event.id) ?? "")
                            setConfirmDeleteModal?.(true)
                        }
                        }
                        className="mt-2 cursor-pointer inline-flex w-fit rounded-sm bg-red-700 px-4 py-2 text-sm
                     afont-semibold text-white transition-colors hover:brightness-95 "
                    >Delete</button>


                </div>
            </div>
        </div>
    );
}
