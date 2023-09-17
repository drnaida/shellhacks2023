using shellhacks2023.Data;

namespace shellhacks2023.Models
{
    public class ExamDTO
    {
        public Exam Exam { get; set; }
        public List<Question> Questions { get; set; }
    }
}
