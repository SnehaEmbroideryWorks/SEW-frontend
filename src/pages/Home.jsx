import { Link } from "react-router-dom";
import machine from "../assets/images/machine.png"
import { GoArrowDown } from "react-icons/go";
import boatNeck from "../assets/images/boatNeck.png"
import uShapedNeck from "../assets/images/uShapedNeck.png"
import roundNeck from "../assets/images/roundNeck.png"
import potNeck from "../assets/images/potNeck.png"
import starNeck from "../assets/images/starNeck.png"

const neckTypes = [
  { name: "Boat Neck", slug: "boat-neck", image: boatNeck },
  { name: "Round Neck", slug: "round-neck", image: roundNeck },
  { name: "U-Shaped Neck", slug: "u-shaped-neck", image: uShapedNeck },
  { name: "Pot Neck", slug: "pot-neck", image: potNeck },
  { name: "Star Neck", slug: "star-neck", image: starNeck }
];

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Hero Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-blue-900 leading-tight mb-4">
              Crafted Embroidery,
              <br />
              Designed for Your Saree
            </h1>

            <p className="text-blue-700 text-lg mb-6">
              Choose a design, match your saree colors, and get a blouse
              embroidered just for you — traditional, elegant, and personal.
            </p>

            <div
              className="flex w-fit gap-4 bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition "
            >
              <div>
                Browse Designs
              </div>
              <div className="p-1">
                <GoArrowDown />
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <img
              src={machine}
              alt="Embroidery blouse"
              className="rounded-xl shadow-lg h-fit"
            />
          </div>
        </div>
      </section>

      {/* NECK TYPE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-10">
          Browse by Neck Type
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {neckTypes.map(type => (
            <Link
              key={type.slug}
              to={`/category/${type.slug}`}
              className="group border border-blue-200 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition bg-white"
            >
              {/* Image area */}
              <div className="w-full aspect-square mb-4 flex items-center justify-center overflow-hidden rounded-lg ">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />
              </div>

              {/* Type name */}
              <h3 className="text-sm sm:text-base font-medium text-blue-800 mb-2">
                {type.name}
              </h3>

              {/* CTA */}
              <p className="text-xs sm:text-sm text-blue-600 group-hover:text-blue-800">
                View Designs →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="bg-blue-100 text-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            About Us
          </h2>

          <div className="space-y-3 text-blue-100">
            <p className="text-blue-700">
              <span className="font-medium text-blue-900">Address:</span>  
              &nbsp;H.No.5-37/7a/a/1, Sai Nagar Colony, Bhoodhan Pochampally, Telangana, India
            </p>

            <p className="text-blue-700">
              <span className="font-medium text-blue-900">Phone:</span>  
              &nbsp;+91 9398336923
            </p>

            <p className="text-blue-700">
              <span className="font-medium text-blue-900">Email:</span>  
              &nbsp;orders.snehaembroideryworks@gmail.com
            </p>

            <p className="text-blue-700">
              <span className="font-medium text-blue-900">Location:</span>{" "}
              <a
                href="https://maps.app.goo.gl/P9UUNQuJaJ9xuXFn7"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                View on Google Maps
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}






