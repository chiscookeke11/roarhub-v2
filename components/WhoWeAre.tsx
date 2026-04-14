import { CircleCheck } from "lucide-react";
import Image from "next/image";




export default function WhoWeAre() {
    return (
        <div id="whoWeAre" className=" w-full py-16 md:py-24 px-[5%] flex-col lg:flex-row flex items-center justify-center gap-20 lg:gap-100 font-plus-jakarta " >



            <div className="w-80 h-55  md:w-112.5 md:h-72.25 bg-white shadow-2xl rounded-3xl p-4 flex items-center justify-center relative " >

                <div className="w-30 h-22 md:w-35 md:h-27 bg-[#0e6efd] absolute flex flex-col items-start justify-center p-3 rounded-2xl text-sm text-white top-[-5%] left-[-5%]  "  >
                    <span className=" text-2xl md:text-[32px] font-semibold " >1st</span>
                    In West Africa
                </div>

                <Image src={"/homepage/roar.jpg"} alt="Hero image" height={500} width={500} className="h-full w-full rounded-3xl object-center object-cover " />
            </div>


            <div className="w-full max-w-2xl flex flex-col items-start gap-3 font-plus-jakarta " >
                <h4 className="text-[#0e6efd] text-base md:text-xl font-semibold uppercase " >Who We Are</h4>

                <h2 className="text-[#2c3e50] text-2xl md:text-[38px] font-bold max-w-129 " >Innovation Embedded in Academia</h2>

                <p className="text-base md:text-xl text-[#2c3e50] font-normal mt-3 max-w-156 "  >Roar Nigeria Hub is a community that provides professional support to technology enabled start-ups, researches, entrepreneurs and SME'S.
                    <br />
                    <br />

                    The programs are designed to develop a next generation of innovations and creators that will provide local technology based solution with a global prospective.</p>


                <div className="w-full grid grid-cols-2 place-items-start justify-items-start mt-3 " >

                    <div className="w-full flex items-center gap-3 text-sm font-semibold  " >
                        <CircleCheck size={23} fill="#0e6efd" color="white" />
                        Expert Mentorship
                    </div>


                    <div className="w-full flex items-center gap-3 text-sm font-semibold  ">
                        <CircleCheck size={23} fill="#0e6efd" color="white" />
                        Global Network
                    </div>
                </div>

            </div>


        </div>
    )
}