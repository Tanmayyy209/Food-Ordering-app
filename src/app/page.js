import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";



import Link from "next/link";

export default function Home() {
  return (
    <>
    <Hero/>
    <HomeMenu/>
    <section className="text-center my-16" id="about">
      <SectionHeaders
      subHeader={'Our story'}
      mainHeader={'About us'}
      />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex 
      flex-col gap-4 ">
      <p>
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting 
      industry&apos; Lorem Ipsum has been the indust
      rys standard dummy text ever since the 1500s
       when an unknown printer took a galley of type
        and scrambled it to make a type specimen book

      </p>
      <p>
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting 
      industry&apos; Lorem Ipsum has been the indust
      rys standard dummy text ever since the 1500s
      when an unknown printer took a galley of type
      and scrambled it to make a type specimen book

      </p>
      <p>
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting 
      industry&apos; Lorem Ipsum has been the indust
      rys standard dummy

      </p>

      </div>

    </section>
    <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +91 738 123 123
          </a>
        </div>
      </section>
    </>
  )
}
