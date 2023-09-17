using OpenAI_API.Completions;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using Microsoft.Extensions.Configuration;

namespace shellhacks2023.Services
{
    public class OpenAIService
    {
        private string apiKey;
        private OpenAIAPI openai;


        public OpenAIService(IConfiguration configuration)
        {
            this.apiKey = configuration.GetValue<string>("OpenAI:ApiKey");
            this.openai = new OpenAIAPI(apiKey);
        }

        public async Task<string> GetCompletionAsync(string query)
        {
            string outputResult = "";   
            CompletionRequest completionRequest = new CompletionRequest();
            completionRequest.Prompt = query;
            completionRequest.Model = OpenAI_API.Models.Model.DavinciText;
            completionRequest.MaxTokens = 1024;

            var completions = await openai.Completions.CreateCompletionAsync(completionRequest);

            foreach (var completion in completions.Completions)
            {
                outputResult += completion.Text;
            }

            return outputResult;
        }
        public async Task<string> GetChatCompletionAsync(string chatMessage, string model_to_use = "GPT-3.5")
        {
            Model model;
            switch (model_to_use)
            {
                case "GPT-3.5":
                    model = Model.ChatGPTTurbo; break;
                case "GPT-4":
                    model = Model.GPT4; break;
                default:
                    return "Wrong Model Selection";
            }
            var result = await openai.Chat.CreateChatCompletionAsync(new ChatRequest()
            {
                Model = Model.ChatGPTTurbo,
                Temperature = 0.1,
                MaxTokens = 300,
                Messages = new ChatMessage[] {
                    new ChatMessage(ChatMessageRole.User, chatMessage)
                }
            });

            return result.ToString();
        }
    }
}
