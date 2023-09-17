using Microsoft.AspNetCore.Mvc;
using shellhacks2023.Data;
using shellhacks2023.Models;
using Microsoft.EntityFrameworkCore;

namespace shellhacks2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : Controller
    {
        private readonly DataContext db;

        public SessionController(DataContext dataContext)
        {
            db = dataContext;
        }
        [HttpGet]
        [Route("GetSessionsByExam")]
        public async Task<ActionResult<List<Session>>> GetSessionsByExam(Guid examId)
        {
            var sessions = await db.Sessions.Where(s => s.ExamId==examId).Include(s=>s.Exam).Include(s=>s.Student).ToListAsync();

            if (sessions.Count==0)
            {
                return NotFound(nameof(examId));
            }

            return Ok(sessions);
        }
        [HttpGet]
        [Route("GetAnswersBySession")]
        public async Task<ActionResult<List<Answer>>> GetAnswersBySession(Guid sessionId)
        {
            var answers = await db.Answers.Where(a=> a.SessionId == sessionId).Include(a=>a.Question).Include(a=>a.Session).Include(a=>a.Session.Exam).ToListAsync();

            if (answers.Count==0)
            {
                return NotFound(nameof(sessionId));
            }
            return Ok(answers);
        }

        [HttpPost]
        [Route("UpdateSessionFeedback")]
        public async Task<ActionResult<Session>> UpdateSessionFeedback([FromBody] UpdateSessionRequest requestData)
        {
            var ans_list = new List<Answer>();
            foreach (var answerF in requestData.AnswerFeedback)
            {
                var db_answer = await db.Answers.FirstOrDefaultAsync(a => a.Id == answerF.Key);
                if(db_answer != null)
                {
                    db_answer.Feedback = answerF.Value; 
                    db.Update(db_answer);
                    await db.SaveChangesAsync();

                    ans_list.Add(db_answer);
                }

            }
            return Ok(ans_list);
        }

        [HttpGet]
        [Route("GetSessionStats")]
        public async Task<ActionResult<SessionStatsDTO>> GetSessionStats(Guid sessionId)
        {
            var ans_list = await db.Answers.Where(a=> a.SessionId == sessionId).ToListAsync();

            if (ans_list.Count==0)
                return NotFound(nameof(sessionId));

            var status = "confident";
            var correct = 0;
            foreach (var answer in ans_list)
            {
                if (answer.Feedback.ToLower().Contains("unsure"))
                {
                    status = "not confident";
                }
                if (answer.Feedback.ToLower().Contains("correct") && !answer.Feedback.ToLower().Contains("correct"))
                {
                    correct++;
                }
                
            }
            float grade = correct/ans_list.Count()*100;
            var stats = new SessionStatsDTO
            {
                grade = grade,
                status = status
            };
            return Ok(stats);
        }
    }
}
