"use client"

import AddEventModal from "@/components/AddEventModal";
import ConfirmDelete from "@/components/ConfirmDelete";
import AdminEventCard from "@/components/ui/AdminEventCard";
import Spinner from "@/components/ui/Spinner";
import UpdateEventModal from "@/components/UpdateEventModal";
import { EventItem } from "@/types/types";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";


export default function Page() {
    const [events, setEvents] = useState<EventItem[] | null>(null)
    const [showOptionsIndex, setShowOptionsIndex] = useState<string | null>(null);
    const [showEditEventModal, setShowEditEventModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState("")
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [openEventModal, setOpenEventModal] = useState(false)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchEvents = async () => {

            const { data, error } = await supabase
                .from("events").select("*")
                .order("date", { ascending: false })

            if (error) {
                setLoading(false)
                console.error("Error fetching all events:", error)
            }
            else if (data) {
                setEvents(data)
            }

            setLoading(false)
        }

        fetchEvents()
    }, [])


    useEffect(() => {

        document.body.style.overflow = openEventModal || confirmDeleteModal || showEditEventModal ?
            "hidden" : "auto"

        return () => {
            document.body.style = "auto"
        }
    }, [openEventModal, confirmDeleteModal, showEditEventModal])



    // This function removes the post from the UI
    const removeEventFromUI = (id: string) => {
        setEvents(prev => (prev ? prev.filter(event => String(event.id) !== id) : null))
    }


// this function adds the post to the ID
    const addEventToUI = (newBlog: EventItem) => {
        setEvents((prev) => {
            if (!prev) {
                return [newBlog]
            }
            return [newBlog, ...prev]
        })
    }


// this function updates the post to the ID
    const updateEventInUI = (updatedEvent: EventItem) => {
        setEvents((prevNews) =>
            prevNews
                ? prevNews.map((news) =>
                    news?.id === updatedEvent?.id ? updatedEvent : news
                )
                : [updatedEvent]
        )
    }


    if (loading) {
        <div className="w-full h-screen flex items-center justify-center bg-white ">
            <Spinner />
        </div>
    }


    return (
        <div className=" w-full flex h-full min-h-screen px-[3%] py-4 bg-white font-poppins flex-col items-start gap-5 relative "  >

            <h1 className=" text-xl md:text-3xl font-semibold text-[#008CC1] " >Events Control Panel</h1>


            <button
                onClick={() => setOpenEventModal(true)}
                className="mt-8 bg-[#2c3e50] ml-auto px-8 md:px-16 py-2 md:py-4 font-medium flex items-center
             justify-center cursor-pointer rounded-md text-white transform
             hover:scale-105 transition-all duration-300 " >
                Add Event</button>


            {!events ? (<div className="w-full h-[50vh] flex items-center justify-center " >
                <Spinner /> </div>)
                : events.length < 1 ? (<div className="h-[70vh] w-full flex items-center justify-center px-5 py-4 font-poppins text-black font-medium text-2xl " > <p>No news found</p> </div>)
                    : (
                        <>
                            {/* Events section */}
                            < section className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20 gap-10 place-items-center justify-items-center " >
                                {events?.map((data, i) => (
                                    <AdminEventCard
                                        data={data}
                                        key={i}
                                        showOptionsIndex={showOptionsIndex}
                                        setShowOptionsIndex={setShowOptionsIndex}
                                        setSelectedIndex={setSelectedIndex}
                                        setShowEditBlogModal={setShowEditEventModal}
                                        setConfirmDeleteModal={setConfirmDeleteModal}
                                    />
                                ))}
                            </section>
                        </>
                    )
            }



            {openEventModal &&
                (<AddEventModal
                    setOpenBlogModal={setOpenEventModal}
                    addBlogToUI={addEventToUI} />)}



            {confirmDeleteModal &&
                <ConfirmDelete
                    collectionName={"events"}
                    onDelete={removeEventFromUI}
                    setConfirmDeleteModal={setConfirmDeleteModal}
                    selectedIndex={selectedIndex} />}


            {showEditEventModal &&
                <UpdateEventModal
                    setShowEditBlogModal={setShowEditEventModal}
                    selectedIndex={selectedIndex}
                    updateBlogInUI={updateEventInUI} />}

        </div>
    )
}