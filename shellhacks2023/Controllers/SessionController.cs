using Microsoft.AspNetCore.Mvc;
using shellhacks2023.Data;
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
            var sessions = await db.Sessions.Where(s => s.ExamId==examId).Include(s=>s.Exam).ToListAsync();

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
    }
}
