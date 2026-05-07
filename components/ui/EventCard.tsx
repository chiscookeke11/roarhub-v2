import Image from "next/image";




export default function EventCard() {
    return (
        <div className=" w-full bg-white h-full rounded-2xl flex flex-col items-start gap-5 p-3 "  >

            {/* the image  */}
            <div className="w-full h-50 flex items-center justify-center overflow-hidden bg-gray-200 relative rounded-2xl "  >
                <Image src={""} alt="image" fill className="object-center object-cover " />
            </div>



            {/* The text content */}
            <div className="w-full flex items-start flex-col gap-4 " >

                <h6>October 24, 2023</h6>

                <h3>The Minimalist Manifesto</h3>

            </div>

        </div>
    )
}