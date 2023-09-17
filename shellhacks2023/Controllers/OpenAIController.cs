using Microsoft.AspNetCore.Mvc;
using shellhacks2023.Services;

namespace shellhacks2023.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using OpenAI_API;
    using OpenAI_API.Completions;

    namespace ChatGPT_App.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class OpenAIController : ControllerBase
        {
            private readonly OpenAIService openAi;

            public OpenAIController(OpenAIService openaiService)
            {
                this.openAi = openaiService;
            }
            [HttpGet]
            [Route("TestTextCompletion")]
            public async Task<ActionResult<string>> TestTextCompletion(string query)
            {
                //Get a response from the OpenAI API
                var response = await openAi.GetCompletionAsync(query);
                //Return the response
                return Ok(response);

            }
            [HttpGet]
            [Route("TestChatCompletion")]
            public async Task<ActionResult<string>> TestChatCompletion(string query, string model)
            {
                //Get a response from the OpenAI API
                var response = await openAi.GetChatCompletionAsync(query, model);  
                //Return the response
                return Ok(response);

            }
        }
    }
}
