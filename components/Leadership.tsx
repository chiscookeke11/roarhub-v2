import { teamMembers } from "@/data/leaders";
import Leadercard from "./ui/LeaderCard";




export default function Leadership() {
    return (
        <section id="team" className="w-full flex flex-col gap-14 items-center justify-center font-plus-jakarta mt-28 px-[12%] bg-[#f8f9fa] py-16 md:py-24  " >


            <div className="text-center space-y-1 " >
                <h4 className="text-[#0e6efd] text-base md:text-xl font-semibold uppercase " >Leadership</h4>
                <h2 className="text-[#2c3e50] text-2xl md:text-[38px] font-bold max-w-129 " >Meet The Visionaries</h2>
            </div>

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 place-items-center justify-items-center gap-7 "  >

                {teamMembers.map((member) => (
                    <Leadercard key={member.id} data={member} />
                ))}


            </div>

        </section>
    )
}