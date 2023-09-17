import { Form, Formik } from "formik";
import { useState } from "react";
import { PlusLg, TrashFill } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import Themes from "../ThemableProps";
import { CreateExamRequest, QuestionBatchRequest } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { AuthContext } from "../components/ContextProvider";
import { NumericField } from "../components/NumericField";
import { PageHeading } from "../components/PageHeading";
import { TextField } from "../components/TextField";
import { genericSavingToast } from "../helpers/toastHelpers";

export function GenerateExam(): JSX.Element {
  return (
    <>
      <Container width="narrow" className="animate-fade">
        <PageHeading>
          Create Exam
        </PageHeading>
        <h2 className="text-2xl font-bold text-darkGray mb-3 mt-4">Add keywords.</h2>
        <div className="mt-2 mb-4">
          <div className="mb-2">
            Use the form below to name your exam, specify the number of questions you need, and add exam topics.
          </div>
          <div>
            For each topic you wish to include in your exam, input it into the field below and click "Add Exam Topic." Continue this process for each topic you'd like to include in your exam.          </div>
        </div>
        <CreatExamForm />
      </Container>
    </>
  )
}


function CreatExamForm(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [keyStatements, setKeyStatements] = useState<string[]>([]);

  const initialValues = {
    examName: '',
    questionsNumber: '',
    keywords: ''
  }
  const { client, user }: AuthContext = useOutletContext();
  const onSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);
    const data = new QuestionBatchRequest({
      qNumber: Number(values.questionsNumber),
      topics: keyStatements
    });
    console.log(data);

    client?.promptEngineering_BatchQuestionGeneration(data).then(questions => {
      const model = new CreateExamRequest({
        title: values.examName,
        questions: questions,
        topics: keyStatements,
        professorId: user?.id

      });
      const promise = client?.exams_CreateExam(model);
      toast.promise(promise, genericSavingToast).then((exam) => {
        setSubmitting(false);
        navigate(`/Exams/EditExam/${exam.id}`);
      }).catch(() => {
        toast.error('Unable to save changes, a server error occured.');
        setSubmitting(false);
      });
    }).catch(() => {
      toast.error('Failed to create questions. Please try changing Exam Topics.');
      setSubmitting(false);
    }
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      {({ values }) => (
        <Form>
          <div className="p-2">
            <Card className="mb-3 hover:shadow-xl">
              <TextField placeholder="Microbiology Midterm 1" name="examName" label="Exam name" />
            </Card>
            <Card className="mb-3 hover:shadow-xl">
              <NumericField name="questionsNumber" label="Number of Questions to generate" min={0} max={30} step={1} placeholder="30" />
            </Card>
            <Card className="mb-3 hover:shadow-xl">
              <div className="flex flex-row justify-between">
                <div className="w-4/6 mr-3">
                  <TextField placeholder="Photoelectric effect relation with the ultraviolet catastrophe" name="keywords" label="Add Exam Topics (one topic at a time)" />
                </div>
                <div className="w-2/6 flex flex-row justify-start items-end">
                  <Button type="button" theme={Themes.Secondary} className="flex items-center mb-[13px]" disabled={values.keywords == ''} onClick={(() => {
                    setKeyStatements([
                      ...keyStatements,
                      values.keywords
                    ]);
                    values.keywords = '';
                  })}><PlusLg className="ml-2 h-4 w-4" /><span>Add Exam Topic</span></Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-row flex-wrap mb-3">
            {keyStatements.map((keyStatement) => <div className={`w-fit rounded-md p-2 mb-3 text-white bg-primary text-sm font-bold flex items-center mr-3`}>
              <span>{keyStatement}</span>
              <button type="button" onClick={() => {
                let currentArray = keyStatements;
                currentArray = currentArray.filter((keyword) => keyword != keyStatement);
                setKeyStatements(currentArray);
              }}>
                <TrashFill className="ml-2 h-4 w-4" />
              </button>
            </div>)}
          </div>
          <div className="flex flex-row justify-center">
            <Button type="submit" theme={Themes.Primary} disabled={submitting || keyStatements.length == 0}>Submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
