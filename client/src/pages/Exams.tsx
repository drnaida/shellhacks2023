import { EyeFill, PencilFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Themes from "../ThemableProps";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { PageHeading } from "../components/PageHeading";

export function Exams(): JSX.Element {
  const exams = [
    {
      name: 'Exam 1. Microbiology and cellucar molecular biology',
      id: '12345678'
    },
    {
      name: 'Exam 2. Physics, Newton and the pressure law',
      id: '12345679'
    },
    {
      name: 'Exam 3. Microbiology and cellucar molecular biology, very long exam name very very very long. Exam 3. Microbiology and cellucar molecular biology, very long exam name very very very long',
      id: '12345679'
    },
    {
      name: 'Exam 4. Microbiology and cellucar molecular biology',
      id: '12345679'
    },
  ];

  return (
    <>
      <Container width="narrow" className="animate-fade">
        <PageHeading>
          Your Exams
        </PageHeading>
        <p className="mt-2 mb-5">
          Please use the list below to edit or view as a student your exams.
        </p>
        <div>
          {exams.map((exam) => (
            <ExamCard name={exam.name} id={exam.id} />
          ))}
        </div>
      </Container>
    </>
  )
}

interface ExamCardProps {
  name: string;
  id: string;
}

export function ExamCard({ name, id }: ExamCardProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card className="flex mb-3">
      <div className="mr-3 w-1/6">
        <img src={""} alt={`Icon for ${name}`} className="rounded-3xl w-20 h-20 object-cover" />
      </div>
      <div className="w-5/6 flex flex-row justify-between">
        <div className="w-4/6 flex flex-col items-start justify-center">
          {name}
        </div>
        <div className="w-2/6 flex flex-col justify-center items-end">
          <div>
            <Button type="button" theme={Themes.Secondary} className="flex items-center" onClick={() => navigate(`/Exams/EditExam/${id}`)}><PencilFill className="h-4 w-4 mr-2" /><span>Edit</span></Button>
            <Button type="button" theme={Themes.Primary} className="flex items-center" onClick={() => navigate(`/Exams/Student/${id}`)}><EyeFill className="h-4 w-4 mr-2" /><span>View</span></Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
