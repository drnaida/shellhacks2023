import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Themes from "../ThemableProps";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { NumericField } from "../components/NumericField";
import { PageHeading } from "../components/PageHeading";
import { TextField } from "../components/TextField";

export function GenerateExam(): JSX.Element {
  return (
    <>
      <Container width="narrow" className="animate-fade">
        <PageHeading>
          Create Exam
        </PageHeading>
        <h2 className="text-2xl font-bold text-primary mb-2 mt-2">Part 1. Add keywords.</h2>
        <p className="mt-2 mb-5">
          Please use the list below to edit or view as a student your exams.
        </p>
        <CreatExamForm />
      </Container>
    </>
  )
}


function CreatExamForm(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    examName: '',
    questionsNumber: '',
    keywords: []
  }

  const onSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);

    //TODO: code that sends the keywords to backend

    // toast.promise(promise, genericSavingToast).then(() => {
    //   setSubmitting(false);
    // }).catch(console.error);
    navigate('/Exams/EditExam/:ExamId');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      <Form>
        <div className="p-2">
          <TextField placeholder="Microbiology Midterm 1" name="name" label="Exam name" />
          <NumericField name="questionsNumber" label="Number of Questions to generate" min={0} max={30} step={1} placeholder="30" />
        </div>
        <div className="flex flex-row justify-center">
          <Button type="submit" theme={Themes.Primary} disabled={submitting}>Submit</Button>
        </div>
      </Form>
    </Formik>
  )
}
