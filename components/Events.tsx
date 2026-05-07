import Link from "next/link";
import EventCard from "./ui/EventCard";




export default function Events() {
    return (
        <section className="w-full flex flex-col items-center justify-center gap-0 bg-[#2c3e50] py-24 px-[3%] text-white font-plus-jakarta  "  >


            <div className=" w-fit flex flex-col items-center text-center gap-2 "  >
                <h4 className="text-[#0e6efd] text-base md:text-xl font-semibold uppercase ">Life at the Hub</h4>
                <h3 className="text-white text-2xl md:text-[38px] font-bold max-w-129 font-outfit ">Event Gallery</h3>
            </div>


            <div className=" w-full my-20 grid grid-cols-1 md:grid-cols-3 place-items-center justify-items-center justify-center gap-6 " >
                <EventCard />
            </div>


            <Link href={"$"} >See more</Link>

        </section>
    )
}