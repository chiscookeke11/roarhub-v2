"use client"
import type React from "react"
import { type SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { X } from "lucide-react"
import TiptapEditor from "./TipTapEditor"
import { EventItem } from "@/types/types"
import { supabase } from "@/utils/supabase/client"


interface AddEventModalProps {
    setOpenBlogModal?: React.Dispatch<SetStateAction<boolean>>
    addBlogToUI: (blog: EventItem) => void
}

export default function AddEventModal({ setOpenBlogModal, addBlogToUI }: AddEventModalProps) {
    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState<EventItem>({

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
            content: value,
        }))
    }

    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "lsp_preset")
        formData.append("cloud_name", "dmgwgxdd9")

        const response = await fetch("https://api.cloudinary.com/v1_1/dmgwgxdd9/image/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error("Image upload failed")
        }

        const data = await response.json()
        return data.secure_url
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        if (!formValues.title.trim() || !formValues.content.trim()) {
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
            const imageUrl = await uploadImageToCloudinary(file)

            // saving to supabase
            const { data, error } = await supabase.from("events").insert({

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
                title: "",
                content: "",
                facebook_link: "",
                instagram_link: "",
                linkedin_link: "",
                x_link: "",
                image: "",
                publicationDate: null,
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
        <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex items-start justify-center flex-col gap-4 h-fit py-8 px-6 bg-[#F7FCFE] shadow-md rounded-md max-h-[95vh] overflow-y-auto"
            >
                <button onClick={() => setOpenBlogModal?.(false)} className="text-red-600 ml-auto cursor-pointer " ><X size={32} /></button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#008CC1] text-xl md:text-3xl">
                    Add blog details
                </h2>

                <label htmlFor="image" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Blog image *</span>
                    <input
                        type="file"
                        placeholder="blog Image"
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
                        placeholder="Enter blog title"
                        className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>



                <div className="w-full grid grid-cols-2 place-items-center justify-items-center gap-5" >

                    <label htmlFor="x_link" className="w-full flex flex-col gap-1">
                        <span className="text-lg font-semibold text-[#008CC1]">Twitter link</span>
                        <input
                            value={formValues.x_link}
                            name="x_link"
                            onChange={handleChange}
                            id="x_link"
                            placeholder="Post X link"
                            className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        />
                    </label>


                    <label htmlFor="linkedin_link" className="w-full flex flex-col gap-1">
                        <span className="text-lg font-semibold text-[#008CC1]">LinkedIn link</span>
                        <input
                            value={formValues.linkedin_link}
                            name="linkedin_link"
                            onChange={handleChange}
                            id="linkedin_link"
                            placeholder="Post LinkedIn link"
                            className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        />
                    </label>



                    <label htmlFor="instagram_link" className="w-full flex flex-col gap-1">
                        <span className="text-lg font-semibold text-[#008CC1]">Instagram link</span>
                        <input
                            value={formValues.instagram_link}
                            name="instagram_link"
                            onChange={handleChange}
                            id="instagram_link"
                            placeholder="Post Instagram link"
                            className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        />
                    </label>




                    <label htmlFor="linkedIn" className="w-full flex flex-col gap-1">
                        <span className="text-lg font-semibold text-[#008CC1]">Facebook link</span>
                        <input
                            value={formValues.facebook_link}
                            name="facebook_link"
                            onChange={handleChange}
                            id="facebook_link"
                            placeholder="Post Facebook link"
                            className="bg-transparent outline-none border-2 border-[#008CC1] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        />
                    </label>

                </div>


                <div className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Content *</span>
                    <TiptapEditor content={formValues.content} onChange={handleTipTapChange} />
                </div>

                <div className="flex gap-4 ml-auto">
                    <button
                        type="button"
                        className="border-[#008CC1] text-[#008CC1] hover:bg-red-400 transition-all duration-300 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFormValues({ title: "", facebook_link: "", instagram_link: "", linkedin_link: "", x_link: "", content: "", publicationDate: null, image: '' })
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
                        {loading ? "Uploading ..." : "Add Blog"}
                    </button>
                </div>
            </form>
        </div>
    )
}
