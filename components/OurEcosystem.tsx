import { Download, Rocket } from "lucide-react";
import Button from "./ui/CustomButton";
import Image from "next/image";




export default function OurEcosystem() {
    return (
        <section id="ecosystem" className="w-full text-white px-[5%] md:px-[12%] font-plus-jakarta mt-10 grid grid-cols-1 lg:grid-cols-2 place-items-center justify-items-center gap-10 py-16 md:py-24 "  >

            <div className=" w-full flex flex-col items-start gap-4 " >
                <h4 className="text-[#0e6efd] text-base md:text-xl font-semibold uppercase " >Our Ecosystem</h4>
                <h2 className="text-[#2c3e50] text-2xl md:text-[38px] font-bold max-w-129 " >Meet Our Portfolio Startups</h2>


                <p className="text-base md:text-xl text-[#2c3e50] font-normal mt-3 max-w-156 "  >
                    From FinTech to AgriTech, we have nurtured a diverse range of technology-driven ventures that are solving real-world problems across West Africa.
                    <br />
                    <br />

                    Our comprehensive portfolio directory contains detailed information about our graduated startups, their founders, and their journey through the Roar Nigeria Hub.

                </p>


                <Button
                    className="text-lg mt-4 py-4 font-semibold bg-[#06a3da] hover:bg-[#06a3da]
transition-all duration-200 ease-in-out hover:brightness-110 text-white *:
shadow-[0_4px_14px_rgba(6,163,218,0.5)]
"
                >
                    View Startup Directory (PDF)</Button>

            </div>







            <div className="w-full h-full bg-[#f8f9fa] p-12 flex flex-col items-center justify-center  text-center " >

                <span className="shrink-0 size-25 bg-[#06A3DA1A] flex items-center justify-center rounded-2xl text-[#06a3da] " >
                    <Rocket size={40} />
                </span>

                <h2 className="text-[#2c3e50] text-2xl md:text-2xl font-bold max-w-129 mt-4 " >Startups Directory</h2>
                <p className="text-sm md:text-base text-[#2c3e50] font-normal mt-3 max-w-131.5 mb-5 "  >Click below to access the full list of groundbreaking companies born within our hub.</p>


                <Image src={"/homepage/adobe.png"} alt="pdf icon" width={200} height={200} className=" size-23 object-cover object-center animate-pulse " />


               <a
  href="/pdf/startups.pdf"
  download
  className="text-[#0e6efd] flex items-center justify-center gap-2 font-semibold cursor-pointer text-base mt-5"
>
  <Download size={15} />
  Download for Offline Viewing
</a>

            </div>




        </section>
    )
}