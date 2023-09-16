using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using shellhacks2023.Data;
using shellhacks2023.Models;
using System.Drawing;
using System.Numerics;

namespace shellhacks2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsController : Controller
    {
        private DataContext db;

        public ExamsController(DataContext dataContext)
        {
            db = dataContext;
        }
        [HttpGet]
        [Route("AllExams")]
        public async Task<IActionResult> AllExams(Guid professorId)
        {

            //Get all exams for a professor Id by looking for his id in table exams
            var exams = await db.Exams
                .Where(e => e.OwnerId == professorId)
                .Join(
                    db.Users,
                    exam => exam.OwnerId,       // Key selector for the outer collection (Exams)
                    user => user.Id,            // Key selector for the inner collection (Users)
                    (exam, user) => new         // Result selector
                    {
                        Exam = exam,
                        User = user
                    }
                )
                .ToListAsync();

            return Ok(exams);
    }

    [HttpGet]
    [Route("QuestionsFromExam")]
    public async Task<IActionResult> AllExamQuestions(Guid examId)
    {
            var exam = await db.Exams
                .Where(e => e.Id == examId)
                .FirstOrDefaultAsync();
            var exam_name = exam.Title;
            var questions = await db.Questions
                .Where(q => q.ExamId == examId)
                .ToListAsync();
            var data = new { exam_name, questions };
            return Ok(data);
    }

    [HttpPost]
    [Route("CreateExam")]
    public async Task<IActionResult> CreateExam([FromBody] CreateExamRequest body)
    {
            var newExam = new Exam{
                Title = body.title,
                OwnerId = body.professorId,
                Topics = body.topics,
            };
            db.Exams.Add(newExam);
            await db.SaveChangesAsync();
            Guid newExamId = newExam.Id;
            await AddQuestions(body.questions, newExamId);

            return Ok(newExamId);
        }

        public async Task AddQuestions(List<string> questions, Guid examId)
        {
            foreach (var q in questions)
            {
                db.Questions.Add(new Question
                {
                    Text = q,
                    ExamId = examId
                });
            }
            await db.SaveChangesAsync();
        }

        [HttpPut]
        [Route("UpdateExam")]
        public async Task<IActionResult> UpdateExam([FromBody] UpdateExamRequest body)
        {
            //Get exam from id in body
            var exam = await db.Exams.Where(e => e.Id == body.examId).FirstOrDefaultAsync();
            
            exam.Title = body.title;
            exam.Topics = body.topics;

            db.Exams.Update(exam);

            //Delete all current questions for the exam
            var q_del = await db.Questions.Where(q=>q.ExamId == body.examId).ToListAsync();
            foreach (var q in q_del)
            {
                db.Questions.Remove(q);
            }
            await db.SaveChangesAsync();

            //Add the new questions
            await AddQuestions(body.questions, body.examId);

            return Ok();
        }
    }

}
