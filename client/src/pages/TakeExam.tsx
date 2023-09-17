import { Form, Formik } from "formik";
import { useOutletContext } from "react-router-dom";
import Themes from "../ThemableProps";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { UserContextProps } from "../components/ContextProvider";
import { PageHeading } from "../components/PageHeading";
import { TextAreaField } from "../components/TextArea";

export function TakeExam(): JSX.Element {
  const { client }: UserContextProps = useOutletContext();
  const questions = [
    {
      text: 'Q1 Text',
      id: '1'
    },
    {
      text: 'Q2 Text',
      id: '2'
    },
    {
      text: 'Q3 Text',
      id: '3'
    },
    {
      text: 'Q4 Text',
      id: '4'
    },
  ];

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
        Exam Name
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
              <QuestionCard text={q.text} id={q.id} key={idx} />
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
