using OpenAI_API.Completions;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using Microsoft.Extensions.Configuration;

namespace shellhacks2023.Models
{
    public class QuestionBatchRequest
    {
        public List<string> Topics { get; set; }
        public int QNumber { get; set; }
        public string Model { get; set; } = "GPT-3.5";
    }
}
