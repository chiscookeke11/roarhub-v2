"use client"



import EventCard from "@/components/ui/EventCard";
import { EventItem } from "@/types/types";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";



export default function Page() {
    const [events, setEvents] = useState<EventItem[] | null>(null)
    const [showOptionsIndex, setShowOptionsIndex] = useState<string | null>(null);
    const [showEditBlogModal, setShowEditBlogModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState("")
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [openBlogModal, setOpenBlogModal] = useState(false)



    const fetchNews = async () => {
        const { data, error } = await supabase.from('news').select("*")

        if (error) {
            console.error("Error fetching news")
        }
        else {
            // setNews(data)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])




    return (
        <div className=" w-full flex h-full min-h-screen px-[3%] py-10 bg-white font-poppins flex-col items-start gap-5 relative "  >

            <h1 className=" text-xl md:text-3xl font-semibold text-[#008CC1] " >Events Control Panel</h1>


            <button onClick={() => setOpenBlogModal(true)} className="mt-8 bg-[#008CC1] ml-auto px-8 md:px-16 py-2 md:py-4 font-medium flex items-center justify-center cursor-pointer rounded-md text-white transform hover:scale-105 transition-all duration-300 " >Add Event</button>


            {!events ? (<div className="w-full h-[50vh] flex items-center justify-center " > <Spinner /> </div>)
                : events.length < 1 ? (<div className="h-[70vh] w-full flex items-center justify-center px-5 py-4 font-poppins text-black font-medium text-2xl " > <p>No news found</p> </div>)
                    : (
                        <>
                            {/* News section */}
                            < section className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20 gap-10 place-items-center justify-items-center " >
                                {news?.map((data, i) => (
                                    <EventCard
                                        data={data}
                                        key={i}
                                        showOptionsIndex={showOptionsIndex}
                                        setShowOptionsIndex={setShowOptionsIndex}
                                        setSelectedIndex={setSelectedIndex}
                                        setShowEditBlogModal={setShowEditBlogModal}
                                        setConfirmDeleteModal={setConfirmDeleteModal}
                                    />
                                ))}
                            </section>
                        </>
                    )
            }



            {openBlogModal && (<AddEventModal setOpenBlogModal={setOpenBlogModal} addBlogToUI={addBlogToUI} />)}
            {confirmDeleteModal && <ConfirmDelete collectionName={"news"} onDelete={removeBlogFromUI} setConfirmDeleteModal={setConfirmDeleteModal} selectedIndex={selectedIndex} />}
            {showEditBlogModal && <UpdateEventModal setShowEditBlogModal={setShowEditBlogModal} selectedIndex={selectedIndex} updateBlogInUI={updateBlogInUI} />}

        </div>
    )
}