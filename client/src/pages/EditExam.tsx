import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ArrowRepeat } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { Form, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Themes from "../ThemableProps";
import { Exam, QuestionSingleRequest, UpdateExamRequest } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { AuthContext } from "../components/ContextProvider";
import { Loading } from "../components/Loading";
import { PageHeading } from "../components/PageHeading";
import { genericSavingToast } from "../helpers/toastHelpers";

export function EditExam(): JSX.Element {
  const { client, setUser }: AuthContext = useOutletContext();
  const [exam, setExam] = useState<Exam>();
  const [questions, setQuestions] = useState<string[]>([]);
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
      const tempArray = [];
      for (const obj of res.questions) {
        tempArray.push(String(obj.text));
      }
      setQuestions(tempArray);
      setLoadingData(false);
    }).catch(console.error);
  }, []);

  const regenerateQuestion = (oldQuestion: string) => {
    setSubmitting(true);
    const data = new QuestionSingleRequest({
      topics: exam?.topics,
      question: oldQuestion
    });
    const promise = client!.promptEngineering_SingleQuestionGeneration(data);
    toast.promise(promise, genericSavingToast).then((newQuestion) => {
      const indexOldQuestion = questions.indexOf(oldQuestion);
      const tempArray: string[] = questions;
      tempArray[indexOldQuestion] = newQuestion;
      setQuestions(tempArray);
      setSubmitting(false);
    }).catch(() => {
      toast.error('Unable to regenerate, a server error occured. Please try again.');
      setSubmitting(false);
    });
  }
  const initialValues = {}

  const onSubmit = async (values: typeof initialValues) => {
    const model = new UpdateExamRequest({
      title: exam?.title,
      questions: questions,
      topics: exam?.topics,
      examId: exam?.id
    });
    const promise = client!.exams_UpdateExam(model);
    toast.promise(promise, genericSavingToast).then(() => {
      setSubmitting(false);
      navigate('/Exams');
    }).catch(() => {
      toast.error('Unable to save changes, a server error occured.');
      setSubmitting(false);
    });
  }

  return (
    <>
      <Container width="narrow" className="animate-fade">
        {loadingData && <>
          <Loading text="Loading questions, please wait..." />
        </>}
        {!loadingData && <>
          <Formik initialValues={initialValues} onSubmit={() => { }} enableReinitialize>
            {({ values }) => (
              <Form>
                <PageHeading>
                  Create Exam
                </PageHeading>
                <h2 className="text-2xl font-bold text-darkGray mb-3 mt-4">Questions for {exam?.title}.</h2>
                <div className="mt-2 mb-4">
                  <div className="mb-2">
                    Please look at the generated questions. If you want to regenerate a question, click at the "Regenerate Question" button. Submit when you like all of the questions.
                  </div>
                </div>
                <div className="flex flex-row flex-wrap mb-3">
                  {questions.map((question: string) => <Card className="mb-3 hover:shadow-xl">
                    <p className="whitespace-pre-wrap mb-2">
                      {question}
                    </p>
                    <div className="w-full flex flex-row justify-end">
                      <Button type="button" theme={Themes.Secondary} className="flex items-center mb-[13px]" disabled={submitting} onClick={(() => {
                        regenerateQuestion(question);
                      })}><ArrowRepeat className="mr-2 h-4 w-4" /><span>Regenerate Question</span></Button>
                    </div>
                  </Card>)}
                </div>
                <div className="flex flex-row justify-center">
                  <Button type="submit" theme={Themes.Primary} disabled={submitting} onClick={() => { onSubmit(values) }}>Submit</Button>
                </div>
              </Form>
            )}

          </Formik>
        </>}
      </Container>
    </>
  )
}
