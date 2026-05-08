"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"
import { EventItem } from "@/types/types"
import { supabase } from "@/utils/supabase/client"
import Spinner from "./ui/Spinner"
import TiptapEditor from "./ui/TipTapEditor"

interface UpdateEventModalProps {
    setShowEditBlogModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedIndex: string
    updateBlogInUI: (blog: EventItem) => void
}

export default function UpdateEventModal({
    setShowEditBlogModal,
    selectedIndex,
    updateBlogInUI,
}: UpdateEventModalProps) {
    const [loading, setLoading] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<EventItem | null>(null)
    const [formValues, setFormValues] = useState<EventItem>({
        title: "",
      description: "",
        image: "",
        id: 0,
        date: "",
        excerpt: "",
        location: "",
        slug: ""
    })
    const [file, setFile] = useState<File | null>(null)

    //  Fetch existing blog details
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .eq("id", selectedIndex)
                .single()

            if (error) {
                // console.error(error)
                toast.error("Error fetching blog data")
            } else {
                setSelectedBlog(data)
                setFormValues(data)
            }
            setLoading(false)
        }

        if (selectedIndex) fetchBlog()
    }, [selectedIndex])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleTipTapChange = (value: string) => {
        setFormValues((prev) => ({ ...prev, content: value }))
    }

    //  Upload image to Cloudinary
    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "lsp_preset")
        formData.append("cloud_name", "dmgwgxdd9")

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dmgwgxdd9/image/upload",
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) throw new Error("Image upload failed")

        const data = await response.json()
        return data.secure_url
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formValues.title.trim() || !formValues.description.trim()) {
            toast.error("Please fill in all required fields")
            return
        }

        setLoading(true)

        try {
            let imageUrl = formValues.image

            // If a new image is selected, upload it
            if (file) {
                imageUrl = await uploadImageToCloudinary(file)
            }

            //  Update blog in Supabase
            const { data, error } = await supabase
                .from("news")
                .update({
                    // title: formValues.title,
                    // content: formValues.content,
                    // facebook_link: formValues.facebook_link,
                    // instagram_link: formValues.instagram_link,
                    // linkedin_link: formValues.linkedin_link,
                    // x_link: formValues.x_link,
                    // image: imageUrl,
                    // publicationDate: new Date().toISOString(),
                })
                .eq("id", selectedIndex)
                .select()

            if (error) {
                toast.error(error.message)
                // console.error(error)
                return
            }

            const updatedBlog = data?.[0]
            updateBlogInUI(updatedBlog)
            toast.success("Blog updated successfully!")
            setShowEditBlogModal(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to update blog")
        } finally {
            setLoading(false)
        }
    }

    if (loading && !selectedBlog)
        return (
            <div className="fixed inset-0 bg-black/55 flex items-center justify-center">
                <Spinner />
            </div>
        )

    return (
        <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex items-start justify-center flex-col gap-4 h-fit py-8 px-6 bg-[#F7FCFE] shadow-md rounded-md max-h-[95vh] overflow-y-auto"
            >
                <button
                    onClick={() => setShowEditBlogModal(false)}
                    className="text-red-600 ml-auto cursor-pointer"
                    type="button"
                >
                    <X size={32} />
                </button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#008CC1] text-xl md:text-3xl">
                    Update Event details
                </h2>





                <label htmlFor="image" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">
                        Event image *
                </span>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#008CC1] file:text-white hover:file:bg-[#008CC1]/90 file:cursor-pointer"
                    />
                    {file ? (
                        <span className="text-sm text-gray-600">Selected: {file.name}</span>
                    ) : (
                        formValues.image && (
                            <Image
                                src={formValues.image}
                                alt="Current blog"
                                height={500}
                                width={500}
                                className="mt-2 w-32 h-20 object-cover rounded-md border"
                            />
                        )
                    )}
                </label>

                <label htmlFor="title" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Title *</span>
                    <input
                        value={formValues.title ?? ""}
                        id="title"
                        name="title"
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        className="bg-transparent outline-none border-2 border-[#008CC1] py-2 px-3 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>



                <div className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#008CC1]">Content *</span>
                    <TiptapEditor
                        content={formValues.description ?? ""}
                        onChange={handleTipTapChange}
                    />
                </div>

                <div className="flex gap-4 ml-auto">
                    <button
                        type="button"
                        className="border-[#008CC1] text-[#008CC1] hover:bg-[#008CC1]/10 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFormValues(selectedBlog || formValues)
                            setFile(null)
                        }}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-4 bg-[#008CC1] cursor-pointer text-white hover:bg-[#008CC1]/90 py-3 px-6 h-fit text-base font-medium font-lato"
                    >
                        {loading ? <Spinner /> : "Update Blog"}
                    </button>
                </div>
            </form>
        </div>
    )
}
