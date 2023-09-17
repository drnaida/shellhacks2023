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
        private readonly DataContext _dataContext;

        public ExamsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet]
        [Route("AllExams")]
        public async Task<ActionResult<List<Exam>>> AllExams(Guid professorId)
        {
            // Get all exams for a professor Id by looking for his id in table exams
            var exams = await _dataContext.Exams
                .Where(e => e.OwnerId == professorId)
                .Include(e=>e.Owner)
                .ToListAsync();

            return Ok(exams);
    }

    [HttpGet]
    [Route("QuestionsFromExam")]
    public async Task<ActionResult<ExamDTO>> QuestionsFromExam(Guid examId)
    {
            var exam = await _dataContext.Exams.AsNoTracking().FirstOrDefaultAsync(e => e.Id == examId);
            if (exam == null)
            {
                return NotFound(nameof(exam));
            }

            var questions = await _dataContext.Questions.AsNoTracking().Where(e=>e.ExamId == examId).ToListAsync();
            var data = new ExamDTO{
                Exam = exam,
                Questions = questions
            };
            return Ok(data);
    }

    [HttpPost]
    [Route("CreateExam")]
    public async Task<ActionResult<Exam>> CreateExam([FromBody] CreateExamRequest body)
    {
            var newExam = new Exam{
                Title = body.title,
                OwnerId = body.professorId,
                Topics = body.topics,
            };

            var entity = _dataContext.Exams.Add(newExam);
            await _dataContext.SaveChangesAsync();

            await entity.ReloadAsync();
            await AddQuestions(body.questions, entity.Entity.Id);

            return Ok(newExam);
        }

        public async Task AddQuestions(List<string> questions, Guid examId)
        {
            foreach (var q in questions)
            {
                _dataContext.Questions.Add(new Question
                {
                    Text = q,
                    ExamId = examId
                });
            }
            await _dataContext.SaveChangesAsync();
        }

        [HttpPut]
        [Route("UpdateExam")]
        public async Task<ActionResult<Exam>> UpdateExam([FromBody] UpdateExamRequest body)
        {
            // Get exam from id in body
            var exam = await _dataContext.Exams.FirstOrDefaultAsync(e => e.Id == body.examId);
            if (exam == null)
            {
                return NotFound(nameof(exam));
            }

            exam.Title = body.title;
            exam.Topics = body.topics;

            _dataContext.Exams.Update(exam);

            // Delete all current questions for the exam
            var qDel = await _dataContext.Questions.Where(q => q.ExamId == body.examId).ToListAsync();
            foreach (var q in qDel)
            {
                _dataContext.Questions.Remove(q);
            }
            await _dataContext.SaveChangesAsync();

            // Add the new questions
            await AddQuestions(body.questions, body.examId);

            return Ok(exam);
        }
    }

}
