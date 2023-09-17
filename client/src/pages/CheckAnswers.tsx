import { EyeFill, PencilFill, PlusCircleFill, Link45deg,Check2Square } from "react-bootstrap-icons";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Themes from "../ThemableProps";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";

import { useEffect, useState } from "react";
import { Exam, Session } from "../api/client";
import { AuthContext } from "../components/ContextProvider";
import { Loading } from "../components/Loading";


export function CheckAnswers(): JSX.Element {
  const { client, user }: AuthContext = useOutletContext();
  const navigate = useNavigate();
  //const [exams, setExams] = useState<Exam[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const examId: string = useParams()['ExamId']!;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if(!examId) return;
    client?.session_GetSessionsByExam(examId).then(res => {
      console.log(res);
      setSessions(res);
      setLoading(false);
    }).catch(console.error);
  }, [examId]);

  return (
    <Container width="narrow" className="animate-fade">
      {loading && <>
        <Loading text="Loading answers, please wait..." />
      </>}
      {!loading && <>
        <PageHeading>
          Answers
        </PageHeading>
        <div className="mt-2 mb-6 flex flex-row justify-between w-full">
          <p>
            Below you will see the submisions for Exam:
          </p>
        </div>

        <div>
          {sessions.length > 0 ? sessions.map((session) => (  
            // <ExamCard name={exam.title} id={exam.id!} />
            <AnswerCard key={session.id} studentName={session.student?.name as string} submisionId={session.id as string} />
          )) : <div className="">
            <p className="text-lg text-center my-20 text-darkGray font-semibold">You do not have any answers to check.</p>
          </div>}
        </div>
      </>}
    </Container>
  )
}

interface AnswerCardProps {
  studentName: string;
  submisionId: string;
}

export function AnswerCard({ studentName, submisionId}: AnswerCardProps): JSX.Element {
  const { client, user }: AuthContext = useOutletContext();
  const [grade, setGrade] = useState<number>(0);
  const [status, setStatus] = useState<string>("Unconfident");
  const navigate = useNavigate();
  useEffect(() => {
    if(!submisionId) return;
    client?.session_GetSessionStats(submisionId).then(res => {
      console.log(res);
      setGrade(res.grade as number);
      setStatus(res.status as string);
    }).catch(e => console.log(`Failed to get session stats: ${e}`));
  }, [submisionId]);
  function getGrade(grade: number) {
    //Turn decimal into percentage string
    return `${grade * 100}%`;
  }
  function getStatusCss(status: string) {
    switch(status) {
      case "Confident":
        return "bg-blue-700";
      case "Unconfident":
        return "bg-red-500";
      default:
        return "bg-gray-800";
    }
  }
  function getGradeCss(grade: number) {
    if(grade >= 0.5) {
      return "bg-green-500";
    } else if(grade >= 0.25) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  }
  return (
    <Card className="flex mb-3 hover:shadow-xl">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col flex-grow items-start justify-center">
          {studentName}
        </div>
        <div className={`"flex flex-col flex-grow-0 items-start justify-center px-2 mx-1 ${getGradeCss(grade)} rounded text-white`}>
          {getGrade(grade)}
        </div>
        <div className={`flex flex-col flex-grow-0 items-start justify-center px-2 ${getStatusCss(status)} rounded text-white`}>
          {status}
        </div>
        <div className="flex flex-col flex-grow-0 justify-center items-end">
          <div>
            {/* <Button type="button" theme={Themes.Primary} className="flex items-center" onClick={() => navigate(`/Exams/ValidateAnswer/${submisionId}`)}><Check2Square className="h-full" /></Button> */}
          </div>
        </div>
      </div>
    </Card>
  )
}
