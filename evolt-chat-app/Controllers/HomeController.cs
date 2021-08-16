using evolt_chat_app.Services;
using evolt_chat_app.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Aiesec.Web.Controllers
{
    public class HomeController : Controller
    {
        //private HubLifetimeContext _context;
        public static string username { get; set; }
        //IUsernameService _service;
        public HomeController()
        {
            username = UsernameService.SetUsername();
            //_context = context;
        }

        public IActionResult Index()
        {
            ViewBag.username = username;
            ViewBag.connectedUsers = ChatHub.connectedUsers;
            return View();
        }
    }
}
