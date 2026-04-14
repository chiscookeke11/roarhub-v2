import { Lightbulb, Rocket, Users } from "lucide-react";




export default function OurPillars() {
    return (
        <section id="pillars" className="w-full flex flex-col gap-14 items-center justify-center font-plus-jakarta mt-28 px-[12%] bg-[#f8f9fa] py-24 " >


            <div className="text-center space-y-1 " >
                <h4 className="text-[#0e6efd] text-base md:text-xl font-semibold uppercase " >Our Pillars</h4>
                <h2 className="text-[#2c3e50] text-2xl md:text-[38px] font-bold max-w-129 " >What Drives Us</h2>
            </div>




            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 place-items-center justify-items-center gap-7 "  >



                <div className="w-full h-full shadow-2xl border border-gray-200 rounded-3xl p-6 md:p-10
                flex flex-col items-start justify-items-center justify-center gap-8
                hover:translate-y-[-5%] transition-all duration-400 ease-in-out hover:border-[#06a3da]
                " >

                    <span className="shrink-0 size-17.5 bg-[#06A3DA1A] flex items-center justify-center rounded-2xl text-[#06a3da] " >
                        <Rocket />
                    </span>


                    <div className="flex flex-col items-start gap-2 " >

                        <h3 className="text-base md:text-2xl font-medium text-[#2c3e50]  " >Incubation</h3>
                        <p className="text-sm md:text-base  text-[#212529bf] "  >Nurturing early-stage ideas into scalable business models with structured support.</p>

                    </div>

                </div>



                <div className="w-full h-full shadow-2xl border border-gray-200 rounded-3xl p-6 md:p-10
                flex flex-col items-start justify-items-center justify-center gap-8
                hover:translate-y-[-5%] transition-all duration-400 ease-in-out hover:border-[#06a3da]
                " >

                    <span className="shrink-0 size-17.5 bg-[#06A3DA1A] flex items-center justify-center rounded-2xl text-[#06a3da] " >
                        <Users />
                    </span>


                    <div className="flex flex-col items-start gap-2 " >

                        <h3 className="text-base md:text-2xl font-medium text-[#2c3e50]  " >Community</h3>
                        <p className="text-sm md:text-base  text-[#212529bf] "  >A vibrant network of developers, designers, and thinkers collaborating daily.</p>

                    </div>

                </div>




                <div className="w-full h-full shadow-2xl border border-gray-200 rounded-3xl p-6 md:p-10
                flex flex-col items-start justify-items-center justify-center gap-8
                hover:translate-y-[-5%] transition-all duration-400 ease-in-out hover:border-[#06a3da]
                " >

                    <span className="shrink-0 size-17.5 bg-[#06A3DA1A] flex items-center justify-center rounded-2xl text-[#06a3da] " >
                        <Lightbulb />
                    </span>


                    <div className="flex flex-col items-start gap-2 " >

                        <h3 className="text-base md:text-2xl font-medium text-[#2c3e50]  " >Innovation</h3>
                        <p className="text-sm md:text-base  text-[#212529bf] "  >Pushing the boundaries of technology through research and development.</p>

                    </div>

                </div>


            </div>

        </section>
    )
}

