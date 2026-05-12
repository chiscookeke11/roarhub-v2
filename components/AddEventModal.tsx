"use client"
import type React from "react"
import { type SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { X } from "lucide-react"
import { EventItem } from "@/types/types"
import { supabase } from "@/utils/supabase/client"
import TiptapEditor from "./ui/TipTapEditor"


interface AddEventModalProps {
    setOpenBlogModal?: React.Dispatch<SetStateAction<boolean>>
    addBlogToUI: (blog: EventItem) => void
}

export default function AddEventModal({ setOpenBlogModal, addBlogToUI }: AddEventModalProps) {
    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState<EventItem>({
        date: "",
        description: "",
        excerpt: "",
        id: 0,
        image: "",
        location: "",
        slug: "",
        title: ""
    })
    const [file, setFile] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTipTapChange = (value: string) => {
        setFormValues((prev) => ({
            ...prev,
            description: value,
        }))
    }

    const createSlug = (value: string) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
    }

    const uploadImage = async () => {
        if (!file) {
            toast.error("Please select an image")
            return
        }

        const filename = `${Date.now()}-${file.name}`

        const { error } = await supabase.storage
            .from("event images")
            .upload(filename, file)

        if (error) {
            console.error("Upload error", error.message)
            toast.error("Upload failed")
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("event images")
            .getPublicUrl(filename)

        return publicUrl.publicUrl
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        if (!formValues.title.trim() || !formValues.description.trim() || !formValues.excerpt.trim() || !formValues.date || !formValues.location.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        if (!file) {
            toast.error("Please select an image")
            return
        }

        setLoading(true)

        try {
            // Uploading image
            const imageUrl = await uploadImage()
            if (!imageUrl) {
                toast.error("Image upload failed")
                return
            }

            // saving to supabase
            const { data, error } = await supabase.from("events").insert({
                title: formValues.title.trim(),
                slug: createSlug(formValues.title),
                event_date: formValues.date,
                image: imageUrl,
                excerpt: formValues.excerpt.trim(),
                description: formValues.description.trim(),
                location: formValues.location.trim(),
            }).select()

            if (error) {
                console.error("Failed to upload blog")
                toast.error("Failed to upload blog")
                return;
            }


            const newBlog = data?.[0]

            toast.success("Blog added successfully!")
            addBlogToUI(newBlog)
            setFormValues({
                date: "",
                description: "",
                excerpt: "",
                id: 0,
                image: "",
                location: "",
                slug: "",
                title: ""
            })
            setFile(null)
            setOpenBlogModal?.(false)



        } catch (error) {
            console.error("Failed to submit blog")
            if (error instanceof Error) {
                toast.error(`Failed to add blog: ${error.message}`)
            } else {
                toast.error("Failed to add blog")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed h-screen w-full flex items-center justify-center
        top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex items-start justify-center flex-col
                 gap-4 h-fit py-8 px-6 bg-[#F7FCFE] shadow-md rounded-md max-h-[95vh]
                  overflow-y-auto"
            >
                <button
                    onClick={() => setOpenBlogModal?.(false)}
                    className="text-red-600 ml-auto cursor-pointer " >
                    <X size={32} />
                </button>

                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#008CC1] text-xl md:text-3xl">
                    Add Event details
                </h2>

                <label htmlFor="image" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Event image *</span>
                    <input
                        type="file"
                        placeholder="Event Image"
                        id="image"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#008CC1] file:text-white hover:file:bg-[#008CC1]/90 file:cursor-pointer"
                        required
                    />
                </label>

                <label htmlFor="title" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Title *</span>
                    <input
                        value={formValues.title}
                        id="title"
                        name="title"
                        onChange={handleChange}
                        placeholder="Enter Event title"
                        className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>



                <label htmlFor="excerpt" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Tagline *</span>
                    <input
                        value={formValues.excerpt}
                        id="excerpt"
                        name="excerpt"
                        onChange={handleChange}
                        placeholder="Enter Event Tagline"
                        className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>



                <label htmlFor="date" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Date *</span>
                    <input
                        value={formValues.date}
                        id="date"
                        name="date"
                        type="date"
                        onChange={handleChange}
                        placeholder="Enter Event Date"
                        className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>


                <label htmlFor="location" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Location *</span>
                    <input
                        value={formValues.location}
                        id="location"
                        name="location"
                        onChange={handleChange}
                        placeholder="Enter Event Location"
                        className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>



                <div className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Content *</span>
                    <TiptapEditor content={formValues.description} onChange={handleTipTapChange} />
                </div>

                <div className="flex gap-4 ml-auto">
                    <button
                        type="button"
                        className="border-[#008CC1] text-[#008CC1] hover:bg-red-400 transition-all duration-300 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFile(null)
                        }}
                    >
                        Clear
                    </button>


                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center text-white justify-center gap-4 bg-[#008CC1] cursor-pointer hover:bg-[#008CC1]/90 py-3 px-6 h-fit text-base font-medium font-lato"
                    >
                        {loading ? "Uploading ..." : "Add Event"}
                    </button>
                </div>
            </form>
        </div>
    )
}
