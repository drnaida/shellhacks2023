import { Bullseye, MortarboardFill, PatchQuestionFill, PeopleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Themes from "../ThemableProps";
import logo from "../assets/mortarboard.png";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

import Learning from "../assets/landing/learning.svg";
import Proud from "../assets/landing/proud.svg";
import Quiz from "../assets/landing/quiz.svg";

export function Landing(): JSX.Element {
  const navigate = useNavigate();

  return (

    <div className="absolute top-0 left-0 overflow-auto w-full h-auto bg-tertiary flex flex-col justify-center items-center z-0">

      <div className="h-screen flex flex-col items-center justify-center text-darkGray text-2xl font-light">
        <img src={logo} alt="logo" width={128} height={128} />
        <h1 className="text-6xl font-semibold font-barlow mt-6 mb-2">
          QuizWhiz AI
        </h1>
        <p className="text-xl font-semibold mb-6 text-center">
          AI-powered Exam Generation and Grading
        </p>
        <Button theme={Themes.Primary} onClick={() => navigate('/Auth')} className="animate-pulse hover:animate-none" >Get Started</Button>

        <img src={Learning} alt="learning" width={400} className="absolute bottom-30 left-20 -z-10" />
        <img src={Quiz} alt="learning" width={250} className="absolute bottom-30 right-20 -z-10" />
      </div>

      <div className="flex flex-wrap items-center justify-center relative bg-darkGray py-20">

        <Card className="flex flex-col bg-white !w-1/3 min-h-[220px] p-5 m-5">
          <div className="flex items-center space-x-3 text-3xl text-black">
            <PatchQuestionFill className="h-full text-primary" />
            <h2 className="font-semibold font-barlow">Streamline Exam Prep</h2>
          </div>
          <p className="my-5 text-darkGray">
            QuizWhiz AI uses GPT models to effortlessly generate exam questions. Input your topics, and let the AI do the hard work, providing you with a pool of diverse, well-crafted questions.              </p>
        </Card>


        <Card className="flex flex-col bg-white !w-1/3 min-h-[220px] p-5 m-5">
          <div className="flex items-center space-x-3 text-3xl text-black">
            <Bullseye className="h-full text-primary" />
            <h2 className="font-semibold font-barlow">Tailor Your Exams</h2>
          </div>
          <p className="my-5 text-darkGray">
            Select and customize questions from our generated pool to match your teaching style and curriculum. ExamGenius gives you the flexibility to create exams that perfectly align with your educational goals.</p>
        </Card>

        <Card className="flex flex-col bg-white !w-1/3 min-h-[220px] p-5 m-5">
          <div className="flex items-center space-x-3 text-3xl text-black">
            <PeopleFill className="h-full text-primary" />
            <h2 className="font-semibold font-barlow">Instant Grading</h2>
          </div>
          <p className="my-5 text-darkGray">
            Utilize our automated grading system powered by GPT. Receive instant and precise exam feedback, saving you time and enabling you to focus on what matters most — helping your students succeed.</p>
        </Card>

        <Card className="flex flex-col bg-white !w-1/3 min-h-[220px] p-5 m-5">
          <div className="flex items-center space-x-3 text-3xl text-black">
            <MortarboardFill className="h-full text-primary" />
            <h2 className="font-semibold font-barlow">Enhance Teaching Strategies</h2>
          </div>
          <p className="my-5 text-darkGray">
            Dive into detailed analytics to understand student performance trends. Identify strengths and weaknesses, enabling you to adapt your teaching methods and improve overall academic outcomes.            </p>
        </Card>
      </div>

      <div className="relative w-full h-full">
        <div className="flex space-x-4 my-32 text-xl w-full justify-center items-center">
          <Button theme={Themes.Primary} onClick={() => navigate('/Auth')}>Sign Up</Button>
          <Button theme={Themes.None} onClick={() => navigate('/Auth')}>Login</Button>
        </div>
        <img src={Proud} alt="learning" width={300} className="absolute bottom-20 left-96 -z-10" />
      </div>
      <div className="w-full h-auto bg-white">
        <Footer />

      </div>
    </div>
  )
}
