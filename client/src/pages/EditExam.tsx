import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";

export function EditExam(): JSX.Element {
  return (
    <>
      <Container width="narrow" className="animate-fade">
        <PageHeading>
          Create Exam
        </PageHeading>
        <h2 className="text-2xl font-bold text-darkGray mb-3 mt-4">Part 2. Confirm or Regenerate Questions.</h2>
        <div className="mt-2 mb-4">
          <div className="mb-2">
            Please use the form below to enter your exam name, number of questions that you need, and Exam topics.
          </div>
          <div>
            For example, if you are creating a physics exam, you could write "Photoelectric effect relation with the ultraviolet catastrophe" as one of the
            exams topics, press "Add Exam Topic" button, and then write "Newton's First Law of Motion" as another exam topic and press "Add Exam Topic" button.
          </div>
        </div>
        <EditExamForm />
      </Container>
    </>
  )
}

function EditExamForm(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [keyStatements, setKeyStatements] = useState<string[]>([]);

  const initialValues = {
    examName: '',
    questionsNumber: '',
    keywords: ''
  }

  const onSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);
    const data = {
      examName: values.examName,
      questionsNumber: values.questionsNumber,
      keywords: keyStatements
    }
    console.log(data);

    //TODO: code that sends the keywords to backend

    // toast.promise(promise, genericSavingToast).then(() => {
    //   setSubmitting(false);
    // }).catch(console.error);
    navigate('/Exams/EditExam/:ExamId');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      {({ values }) => (
        <Form>
          <div className="p-2">
            <TextField placeholder="Microbiology Midterm 1" name="examName" label="Exam name" />
            <NumericField name="questionsNumber" label="Number of Questions to generate" min={0} max={30} step={1} placeholder="30" />
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
