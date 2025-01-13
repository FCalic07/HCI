'use client';
import Card from "./CardsComponent";

export default function CardsSection() {
  return (
    <section className="bg-[#170A2D] px-8 py-52">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Card 1 */}
        <Card
          href="#card1"
          imageSrc="/assets/dispatcheer.jpg"
          imageAlt="Dispatcher App"
          description="Dispatcher App"
        />
        {/* Card 2 */}
        <Card
          href="#card2"
          imageSrc="/assets/happyWoman.jpg"
          imageAlt="Customized App"
          description="Customized App"
        />
        {/* Card 3 */}
        <Card
          href="#card3"
          imageSrc="/assets/onphone.jpg"
          imageAlt="Taxi Mobile App"
          description="Taxi Mobile App"
        />
      </div>
    </section>
  );
}
