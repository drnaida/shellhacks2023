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
        private DataContext db;
        public UsersController(DataContext db)
        {
            this.db = db;
        }
        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest body)
        {
            if (body == null)
            {
                throw new ArgumentNullException(nameof(body));
            }
            //Check if user is unique
            var usernameExists = await db.Users.AnyAsync(u=> u.Name == body.UserName);
            if (usernameExists)
            {
                return Conflict("Username Already Exists");
            }


            //Add user to the database
            var user = new User
            {
                Name = body.UserName
            };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            return Ok(user.Id);
        }
    }
}
