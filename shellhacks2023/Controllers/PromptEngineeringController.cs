using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using shellhacks2023.Services;
using System.Text.RegularExpressions;
using shellhacks2023.Models;
using shellhacks2023.Data;
using Microsoft.EntityFrameworkCore;


namespace shellhacks2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptEngineeringController : Controller
    {
        private OpenAIService openAi;
        private DataContext db;
        public PromptEngineeringController(OpenAIService openAIService, DataContext db) {
            this.openAi = openAIService;
            this.db = db;
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
        public async Task<ActionResult<string>> SingleQuestionGeneration([FromBody] QuestionSingleRequest requestData)
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
        [HttpPost]
        [Route("BatchAnswerGeneration")]
        public async Task<ActionResult<Dictionary<Guid, string>>> BatchAnswerGeneration([FromBody] AnswerBatchRequest requestData)
        {
            var questions_string = "";
            var answers_string = "";
            var idx_dict = new Dictionary<string, Guid>();
            var idx = 1;
            foreach (var answer in requestData.Answers)
            {
                Guid question_id = answer.Key;
                var question = db.Questions.Where(q=>q.Id==question_id).FirstOrDefaultAsync().Result.Text;
                questions_string += idx + " : " + question + "\n";
                answers_string += idx + " : " + answer.Value + "\n";
                idx_dict.Add(idx.ToString(), question_id);
                idx++;
            }

            var context = $"A student is being evaluated. They were just asked the following questions:\n {questions_string}. And they had the following ansswers:\n{answers_string}";

            var prompt = $"Evaluate their answers with either \"correct\",\"incorrect\" or \"Unsure\". Format it like this:\n-<- {{AnswerId}} ::: {{evaluation}} ->-";

            var request = context + prompt;
            if (requestData.Model == null) requestData.Model = "GPT-4";
            // Get a response from the OpenAI API
            var response = await openAi.GetChatCompletionAsync(request, requestData.Model);
            var result_pattern = @"-<- (.+?) ->-";
            var evaluations = new Dictionary<Guid, string>();
            MatchCollection matches = Regex.Matches(response, result_pattern);
            var status = "Confident";
            foreach (Match match in matches)
            {
                var text = match.Groups[1].Value;
                var regex = new Regex(":::");
                var content = regex.Split(text);
                var q_id = idx_dict[(content[0].Trim())]; // idx_dict[content[0]];
                var eval = content[1];
                if(eval.ToLower() == "unsure")
                {
                    status = "Not Confident";
                }
                evaluations.Add(q_id, eval);
            }

            if (requestData.StudentId != null && requestData.SaveAnswer != null)
            {
                if (requestData.SaveAnswer.Value)
                {
                    //Get exa id from question
                    Guid examId = db.Questions.Where(q => q.Id == requestData.Answers.Keys.First()).FirstOrDefaultAsync().Result.ExamId;
                    //Create a session
                    var session = new Session
                    {
                        StudentId = requestData.StudentId.Value,
                        ExamId = examId,
                    };
                    db.Sessions.Add(session);
                    await db.SaveChangesAsync();

                    foreach (var answer in requestData.Answers)
                    {
                        var answer_data = new Answer
                        {
                            QuestionId = answer.Key,
                            Text = answer.Value,
                            Feedback = evaluations[answer.Key],
                            SessionId = session.Id
                            
                        };
                        db.Answers.Add(answer_data);
                    }
                    await db.SaveChangesAsync();

                }
            }

            // Return the response
            return Ok(evaluations);
        }
    }
}
