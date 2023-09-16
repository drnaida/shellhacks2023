namespace shellhacks2023.Models
{
    public class UpdateExamRequest : CreateExamRequest
    {
        public Guid examId { get; set; }
    }
}
