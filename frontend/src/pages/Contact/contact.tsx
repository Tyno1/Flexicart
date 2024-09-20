import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import Button from "../../components/ui/Button";

export default function Contact() {
  return (
    <div className="contact">
      <div className="w-full md:w-[80%] mt-4 border-0 min-h-[100vh] mx-auto p-5 mb-10">
        <div className="flex justify-between flex-col">
          <div className="p-10 text-black">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
              Get In <span className="text-primary">Touch</span>
            </h3>
            <p className="mt-4 leading-7 text-gray-500 text-justify">
              Feel free to use the contact form to send us a message directly.
              We'll do our best to respond to your inquiry promptly.
            </p>

            <div className="flex items-center mt-5">
              <IoLocation size={20} style={{ marginRight: "20px" }} />
              <span className="text-sm">Cardiff, Wales CF10 </span>
            </div>
            <div className="flex items-center mt-5">
              <FaPhoneAlt size={20} style={{ marginRight: "20px" }} />
              <span className="text-sm">+44 790 945 3041</span>
            </div>
            <div className="flex items-center mt-5">
              <MdOutlineSupportAgent
                size={25}
                style={{ marginRight: "20px" }}
              />
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
          <form className="md:col-span-8 p-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-primary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring focus:ring-primary focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  required
                />
                <p className="text-primary text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:ring focus:ring-primary"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring focus:ring-primary"
                  id="grid-email"
                  type="email"
                  placeholder="********@*****.**"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-message"
                >
                  Your Message
                </label>
                <textarea
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring focus:ring-primary"
                ></textarea>
              </div>
              <div className="flex justify-between w-full px-3">
                <div className="md:flex md:items-center">
                  <label className="block text-gray-700 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" />
                    <span className="text-sm">Send me your newsletter!</span>
                  </label>
                </div>

                <Button text="Send Message" variant="filled"  className="bg-primary text-white font-bold"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
