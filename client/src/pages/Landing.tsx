import { EyeFill, PencilFill, PlusCircleFill, TrashFill, PeopleFill, CpuFill, DpadFill} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";


export function Landing(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-auto bg-cover bg-center" style={{ backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/05/65/05/49/1000_F_565054947_wOV6I27IJSmV3FfJ7d6Y9yBpQBVKwqiH.jpg)' }}>
            {/* Use overlay to make text readable against the background */}
            <div className="absolute top-0 left-0 overflow-auto w-full h-auto bg-indigo-900 flex flex-col justify-center opacity-90 items-center  z-0">

                <div className="h-screen flex flex-col items-center justify-center text-white text-2xl font-light">
                  <h1 className="text-6xl my-10">
                      <i>SOME AWESOME NAME</i>
                  </h1>
                  Welcome to the future of exams
                <button className="text-white text-[20px] px-5 py-2 my-5 hover:bg-white hover:text-black border-2 border-white" onClick={() => navigate('/Auth')}>Get Started</button>
                </div>

                <div className="space-y-6 my-5 relative">

                    <div className="flex flex-col bg-gradient-to-r from-cyan-900 px-48 py-5">
                    <div className="flex items-center space-x-3 text-5xl">
                        <PeopleFill className="h-full text-white" /> {/* Replace IconName1 with your icon */}
                        <h2 className="text-white">Who Are We?</h2>
                    </div>
                    <p className="text-white my-5">
                        We are the next generation of exam generation and evaluation. We use generative AI to help you as a professor develop comprehensive exams that will actually teach your students using quality descriptions and real world scenarios.
                    </p>
                    </div>

                    <div className="flex flex-col bg-gradient-to-l from-teal-800 px-48 py-5">
                    <div className="flex items-center space-x-3 text-5xl justify-end">
                        <CpuFill className="h-full text-white" /> {/* Replace IconName2 with your icon */}
                        <h2 className=" text-white">Why use it?</h2>
                    </div>
                    <p className="text-white flex w-full justify-end text-right my-5">
                        Save time on your work while delivering a quality education to your students. Have our tool provide instant feedback so there is less waiting around and more learning during the semester.
                    </p>
                    </div>

                    <div className="flex flex-col bg-gradient-to-r from-teal-800 px-48 py-5">
                    <div className="flex items-center space-x-3 text-5xl">
                        <DpadFill className="h-full text-white" /> {/* Replace IconName3 with your icon */}
                        <h2 className=" text-white">The control is in your hands?</h2>
                    </div>
                    <p className="text-white my-5">
                        If you're doubtful about our AI models, or AI in general, you can always keep iterating through questions to your liking, and be able to control the feedback delivered to students so you can supervise it and make sure it's up to your standards.
                    </p>
                    </div>
                </div>

                <div className="flex space-x-4 my-32 text-xl w-full justify-center items-center">
                    <button className="text-white px-5 py-2 border-2 border-white hover:bg-white hover:text-black" onClick={() => navigate('/Auth')}>Sign Up</button>
                    <button className=" text-white px-5 py-2 hover:bg-white border-2 border-white hover:text-black" onClick={() => navigate('/Auth')}>Login</button>
                </div>
                <div className="w-full h-auto bg-white">
                <Footer />

                </div>
            </div>
        </div>
  )
}
