import { TeamMember } from "@/types/types"
import Image from "next/image"



interface LeadercardProps {
    data: TeamMember
}

export default function Leadercard({ data }: LeadercardProps) {
    return (
        <div className="w-full h-full bg-white rounded-3xl flex flex-col items-start gap-8 overflow-hidden  " >
            {/* the image  */}
            <div className="h-100 w-full border-b-4 border-[#0e6efd] overflow-hidden" >
                <Image src={data.image} alt={`${data.name}-image`} width={500} height={500} className="w-full h-full hover:scale-105 object-center object-cover transition-all duration-200 ease-in-out   " />

            </div>

            {/* The content  */}
            <div className="w-full py-5 px-6 flex items-center justify-center flex-col gap-1  text-center "  >
                <h2 className="text-base md:text-2xl font-semibold text-[#2c3e50]  "  >{data.name} </h2>

                <p className="text-sm md:text-base text-[#212529bf] "  > {data.role} </p>
            </div>
        </div>
    )
}