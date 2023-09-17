using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using shellhacks2023.Services;
using System.Text.RegularExpressions;
using shellhacks2023.Models;


namespace shellhacks2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptEngineeringController : Controller
    {
        private OpenAIService openAi;
        public PromptEngineeringController(OpenAIService openAIService) {
            this.openAi = openAIService;
        }

        [HttpPost]
        [Route("BatchQuestionGeneration")]
        public async Task<ActionResult<List<string>>> BatchQuestionGeneration([FromBody] QuestionBatchRequest requestData)
        {
            var topics_string = "";
            foreach (var topic in requestData.Topics)
            {
                topics_string += "- " + topic + "\n";
            }

            var prompt = $"Topics:\n{topics_string}From the topics above, generate me {requestData.QNumber} questions for an exam, do not let the student know which topic they're being evaluated on. Format it like this:\n{{Question #}} << {{Question content}} >>";

            // Get a response from the OpenAI API
            var response = await openAi.GetChatCompletionAsync(prompt, requestData.Model);
            var regex_pattern = @"<< (.+?) >>";
            List<string> questions = new List<string>();
            MatchCollection matches = Regex.Matches(response, regex_pattern);
            foreach (Match match in matches)
            {
                questions.Add(match.Groups[1].Value);
            }

            // Return the response
            return Ok(questions);
        }
        [HttpPost]
        [Route("SingleQuestionGeneration")]
        public async Task<ActionResult<List<string>>> SingleQuestionGeneration([FromBody] QuestionSingleRequest requestData)
        {
            var topics_string = "";
            foreach (var topic in requestData.Topics)
            {
                topics_string += "- " + topic + "\n";
            }

            var prompt = $"Topics:\n{topics_string} You just provided me with some questions for the topics above, I would like you to provide me a different variation for the topic related to this question {requestData.question}\nDo not let the student know which topic they're being evaluated on. Format your response like this:\n{{Question #}} << {{Question content}} >>";

            // Get a response from the OpenAI API
            var response = await openAi.GetChatCompletionAsync(prompt, requestData.Model);
            var regex_pattern = @"<< (.+?) >>";
            List<string> questions = new List<string>();
            MatchCollection matches = Regex.Matches(response, regex_pattern);
            foreach (Match match in matches)
            {
                questions.Add(match.Groups[1].Value);
            }

            // Return the response
            return Ok(questions[0]);
        }
    }
}
