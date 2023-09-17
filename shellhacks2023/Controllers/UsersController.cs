using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shellhacks2023.Data;
using shellhacks2023.Models;

namespace shellhacks2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly DataContext _dataContext;
        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<ActionResult<User>> CreateUser([FromBody] CreateUserRequest body)
        {
            //Check if user is unique
            var usernameExists = await _dataContext.Users.AnyAsync(u => u.Name == body.UserName);
            if (usernameExists)
            {
                return Conflict("Username Already Exists");
            }


            //Add user to the database
            var user = new User
            {
                Name = body.UserName
            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();

            return user;
        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
