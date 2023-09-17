import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Themes from "../ThemableProps";
import { Exam, Question } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { AuthContext } from "../components/ContextProvider";
import { PageHeading } from "../components/PageHeading";
import { TextAreaField } from "../components/TextArea";

export function TakeExam(): JSX.Element {
  const { client }: AuthContext = useOutletContext();
  const [exam, setExam] = useState<Exam>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const examId: string = useParams()['ExamId']!;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const submitAnswers = (values: { [key: string]: string }) => {
    console.log(values);
    // the resulting dictionary contains key-value pairs of questionId-answerText
    //client.CheckAnswers(questionAnswerPairs);
  }

  return (
    <Container width="narrow" className="animate-fade">
      <PageHeading>
        {exam?.title}
      </PageHeading>
      <p className="mt-2 mb-5">
        Welcome to your exam! <br />
        Take your time and ensure you understand each question before providing your responses. <br />
        <b>Good luck!</b>
      </p>
      <Formik initialValues={generateInitialValues()} onSubmit={submitAnswers}>
        <Form>
          <div>
            {questions.map((q, idx) => (
              <QuestionCard text={String(q.text)} id={String(q.id)} key={idx} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button type="submit" theme={Themes.Primary}>Submit</Button>
          </div>
        </Form>
      </Formik>
    </Container>
  )
}

interface QuestionCardProps {
  text: string;
  id: string;
}

export function QuestionCard({ text, id }: QuestionCardProps): JSX.Element {

  return (
    <Card className="mb-3 hover:shadow-xl">
      <p className="whitespace-pre-wrap mb-2">
        {text}
      </p>
      <TextAreaField name={id} label="Your Answer" rows={4} />
    </Card>
  )
}
