namespace shellhacks2023.Models
{
    public class CreateExamRequest
    {
        public string title { get; set; }
        public List<string> questions { get; set; }
        public List<string> topics { get; set; }
        public Guid professorId { get; set; }
    }
}
