
namespace shellhacks2023.Models
{
    public class QuestionSingleRequest
    {
        public List<string> Topics { get; set; }
        public string question { get; set; }
        public string Model { get; set; } = "GPT-3.5";
    }
}
