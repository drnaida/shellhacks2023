import { useEffect, useState } from "react";
import { ArrowRepeat } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useOutletContext, useParams } from "react-router-dom";
import Themes from "../ThemableProps";
import { Exam, Question, QuestionSingleRequest } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { UserContextProps } from "../components/ContextProvider";
import { Loading } from "../components/Loading";
import { PageHeading } from "../components/PageHeading";
import { genericSavingToast } from "../helpers/toastHelpers";

export function EditExam(): JSX.Element {
  const examMock = {
    name: 'Super Exam',
    topics: ['topic 1', 'topic 2'],
    questions: [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac felis eu dolor congue posuere. Quisque id augue eu urna venenatis laoreet. Phasellus aliquam massa non lacus convallis, at tincidunt purus posuere. Sed vel ante non nunc tincidunt interdum. ',
        id: '1'
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac felis eu dolor congue posuere. Quisque id augue eu urna venenatis laoreet. Phasellus aliquam massa non lacus convallis, at tincidunt purus posuere. Sed vel ante non nunc tincidunt interdum. ',
        id: '2'
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac felis eu dolor congue posuere. Quisque id augue eu urna venenatis laoreet. Phasellus aliquam massa non lacus convallis, at tincidunt purus posuere. Sed vel ante non nunc tincidunt interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac felis eu dolor congue posuere. Quisque id augue eu urna venenatis laoreet. Phasellus aliquam massa non lacus convallis, at tincidunt purus posuere. Sed vel ante non nunc tincidunt interdum. ',
        id: '3'
      },
      {
        text: 'Q4 Text',
        id: '4'
      },
    ]
  }
  const { client }: UserContextProps = useOutletContext();
  const [exam, setExam] = useState<Exam>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const examId: string = useParams()['ExamId']!;
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setLoadingData(true);
    client?.exams_QuestionsFromExam(examId).then(res => {
      setExam(res.exam);
      if (!res.exam) throw new Error("Failed to fetch the exam data. Please try again.")
      if (!res.questions) throw new Error("Failed to generate questions. Please try again.");
      setQuestions(res.questions);
      setLoadingData(false);
    }).catch(console.error);
  }, []);

  const regenerateQuestion = (question: Question) => {
    setSubmitting(true);
    const data = new QuestionSingleRequest({
      topics: exam?.topics,
      question: question.text
    });
    const promise = client!.promptEngineering_SingleQuestionGeneration(data);
    toast.promise(promise, genericSavingToast).then(() => {
      setSubmitting(false);
    }).catch(() => {
      toast.error('Unable to regenerate, a server error occured. Please try again.');
    });
  }

  return (
    <>
      <Container width="narrow" className="animate-fade">
        {loadingData && <>
          <Loading text="Loading questions, please wait..." />
        </>}
        {!loadingData && <>
          <PageHeading>
            Create Exam
          </PageHeading>
          <h2 className="text-2xl font-bold text-darkGray mb-3 mt-4">Part 2. Questions for {exam?.title}.</h2>
          <div className="mt-2 mb-4">
            <div className="mb-2">
              Please look at the generated questions. If you want to regenerate a question, click at the "Regenerate Question" button. Submit when you like all of the questions.
            </div>
          </div>
          <div className="flex flex-row flex-wrap mb-3">
            {questions.map((question: Question) => <Card className="mb-3 hover:shadow-xl">
              <p className="whitespace-pre-wrap mb-2">
                {question.text}
              </p>
              <div className="w-full flex flex-row justify-end">
                <Button type="button" theme={Themes.Secondary} className="flex items-center mb-[13px]" onClick={(() => {
                  regenerateQuestion(question);
                })}><ArrowRepeat className="mr-2 h-4 w-4" /><span>Regenerate Question</span></Button>
              </div>
            </Card>)}
          </div>
          <div className="flex flex-row justify-center">
            <Button type="submit" theme={Themes.Primary}>Submit</Button>
          </div>
        </>}
      </Container>
    </>
  )
}
