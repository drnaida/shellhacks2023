using Microsoft.AspNetCore.Mvc;

namespace shellhacks2023.Controllers
{
    public class ExamsControlller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
