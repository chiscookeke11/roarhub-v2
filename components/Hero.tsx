import Image from "next/image";
import Button from "./ui/CustomButton";


export default function Hero() {
    return (
        <section className=" w-full h-screen flex items-center px-[5%] lg:px-[10%] relative ">

            <div className=" w-full h-full absolute inset-0 " >
                <Image src={"/homepage/roarhub-image.jpg"} alt="Hero image" fill className="brightness-70 object-center object-cover " />
            </div>

            <div className="absolute inset-0 bg-[#091E3E]/25 "></div>


            <div className="w-full  flex flex-col items-start gap-4 z-10 " >
                <h3 className="text-[#0d6efd] font-semibold text-xl uppercase font-plus-jakarta "  >Empowering West Africa</h3>
                <h1 className=" text-[35px] md:text-[70px] text-white font-outfit font-bold "  >Innovate, Create
                    <br />   & <span className="text-[#0d6efd]" >Roar.</span></h1>

                <p className="text-[#ffffff80] text-base md:text-xl font-plus-jakarta max-w-214 " >The first University-embedded hub in West Africa, transforming bold ideas into world-class startups.</p>



                <div className=" w-fit flex items-center justify-start gap-4 md:gap-6 "  >
                    <Button variant="primary" className=" md:text-lg " >Join the Hub</Button>
                    <Button variant="outline" className=" md:text-lg " >Our Story</Button>
                </div>

            </div>


        </section>
    )
}