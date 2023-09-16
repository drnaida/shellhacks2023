using Microsoft.AspNetCore.Mvc;
using shellhacks2023.Services;


namespace shellhacks2023.Controllers
{
    public class PromptEngineeringController : Controller
    {
        private OpenAIService openAi;
        public PromptEngineeringController(OpenAIService openAIService) {
            this.openAi = openAIService;
        }
        [HttpGet]
        [Route("TestQuestionGeneration")]
        public async Task<IActionResult> TestQuestionGeneration(List<string> topics, int q_number, string model="GPT-3.5")
        {
            var topics_string = "";
            foreach (var topic in topics) {
                topics_string += "- " + topic + "\n";
            }
            var prompt = "Topics:\n" + topics_string + "From the topics above, generate me "+ q_number +" questions for an exam, do not let the student know which topic they're being evaluated on. Format it like this:\n{ Question Number} >$ { Question}";
            //Get a response from the OpenAI API
            var response = await openAi.GetChatCompletionAsync(prompt, model);
            //Return the response
            return Ok(response);

        }
    }
}
