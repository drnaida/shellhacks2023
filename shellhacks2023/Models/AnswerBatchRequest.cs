namespace shellhacks2023.Models
{
    public class AnswerBatchRequest
    {
        public Dictionary<Guid, string>   Answers { get; set; }
        public bool? SaveAnswer { get; set; } = true;
        public Guid? StudentId { get; set; }
        public string? Model { get; set; } = "GPT-4";

    }
}
