import Button from "./ui/CustomButton";




export default function CTASection() {
    return (
        <section className="w-full my-20 max-w-325 bg-[#091E3E] mx-auto py-20 px-[4%] rounded-3xl flex items-center justify-center flex-col text-center text-white gap-5 font-plus-jakarta  "  >
            <h1 className="font-outfit font-bold text-2xl md:text-5xl  "  >Ready to Build the Future?</h1>
            <p className="text-[#ffffff80] text-lg md:text-xl "  >Join our next cohort of founders and turn your research into a global startup.</p>

            <Button
                variant="outline"
                className="text-xl md:text-xl mt-5 "
            >
                Events</Button>
        </section>
    )
}