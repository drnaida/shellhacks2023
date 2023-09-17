import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext, useParams } from "react-router-dom";
import Themes from "../ThemableProps";
import { AnswerBatchRequest, Exam, Question } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { AuthContext } from "../components/ContextProvider";
import { Loading } from "../components/Loading";
import { PageHeading } from "../components/PageHeading";
import { TextAreaField } from "../components/TextArea";
import { genericSavingToast } from "../helpers/toastHelpers";

type answersType = { [key: string]: string };

export function TakeExam(): JSX.Element {
  const { client }: AuthContext = useOutletContext();
  const [exam, setExam] = useState<Exam>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modelAnswers, setModelAnswers] = useState<answersType>({});
  const [studentAnswers, setStudentAnswers] = useState<answersType>({});
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const examId: string = useParams()['ExamId']!;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [evaluated, setEvaluated] = useState<boolean>(false);

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

  type initialValuesType = { [key: string]: string };
  function generateInitialValues(): initialValuesType {
    const initialValues: initialValuesType = {};

    for (let i = 0; i < questions.length; i++) {
      initialValues[questions[i].id] = "";
    }

    return initialValues;
  }

  const submitAnswers = async (values: { [key: string]: string }) => {
    setSubmitting(true);
    const data = new AnswerBatchRequest({
      answers: values,
    });
    console.log(values);
    const promise = client!.promptEngineering_BatchAnswerGeneration(data);
    toast.promise(promise, genericSavingToast).then((res) => {
      console.log('return', res);
      setModelAnswers(res);
      setStudentAnswers(values);
      setEvaluated(true);
      setSubmitting(false);
    }).catch(() => {
      toast.error('Unable to save changes, a server error occured.');
      setSubmitting(false);
    });
  }

  return (
    <Container width="narrow" className="animate-fade">
      {loadingData && <>
        <Loading text="Loading questions, please wait..." />
      </>}
      {!loadingData && <>
        <PageHeading>
          {exam?.title}
        </PageHeading>
        <p className="mt-2 mb-5"> {!evaluated &&
          <>
            Welcome to your exam! <br />
            Take your time and ensure you understand each question before providing your responses. <br />
            <b>Good luck!</b>
          </>}
          {evaluated && <>
            Your exam results are below.
          </>}
        </p>
        <Formik initialValues={generateInitialValues()} onSubmit={submitAnswers}>
          {({ values }) => (
            <Form>
              <div>
                {questions.map((q, idx) => (
                  <QuestionCard text={String(q.text)} id={String(q.id)} key={idx} evaluationResult={modelAnswers[String(q.id)]} answer={studentAnswers[String(q.id)]} evaluated={evaluated} submitting={submitting} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Button type="submit" theme={Themes.Primary} disabled={submitting || evaluated}>Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </>}
    </Container>
  )
}

interface QuestionCardProps {
  text: string;
  id: string;
  evaluationResult: string;
  evaluated: boolean;
  submitting: boolean;
  answer: string;
}

export function QuestionCard({ text, id, evaluationResult, evaluated, submitting, answer }: QuestionCardProps): JSX.Element {
  let evaluationResultText = '';
  let evaluationResultColor = '';
  if (evaluated) {
    const response = String(evaluationResult).trim();
    if (response === 'correct') {
      evaluationResultText = 'Correct';
      evaluationResultColor = 'bg-green-700';
    } else if (response === 'incorrect') {
      evaluationResultText = 'Wrong';
      evaluationResultColor = 'bg-red-700';
    } else {
      evaluationResultText = 'Unsure';
      evaluationResultColor = 'bg-amber-700';
    }
  }


  return (
    <Card className="mb-3 hover:shadow-xl">
      {evaluated && <div className={`w-fit rounded-md p-2 mb-3 text-white ${evaluationResultColor} text-sm font-bold flex items-center mr-3`}>
        {evaluationResultText}
      </div>}
      <p className="whitespace-pre-wrap mb-2">
        {text}
      </p>
      {evaluated &&
        <p><span className="font-semibold">Student answer: </span>{answer}</p>
      }
      {!evaluated &&
        <TextAreaField name={id} label="Your Answer" rows={4} disabled={evaluated || submitting} />
      }
    </Card>
  )
}
