namespace shellhacks2023.Models
{
    public class UpdateSessionRequest
    {
        public Guid? SessionId { get; set; }
        public Dictionary<Guid, string> AnswerFeedback { get; set; }
    }
}
