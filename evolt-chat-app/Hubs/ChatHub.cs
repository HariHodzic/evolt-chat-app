using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aiesec.Web.Controllers;
using evolt_chat_app.Services;
using Microsoft.AspNetCore.SignalR;


namespace evolt_chat_app.Hubs
{
    public class ChatHub:Hub
    {
        public static List<string> connectedUsers = new List<string>();
        public async Task SendMessage(string username, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", username, message);
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", HomeController.username);
            connectedUsers.Add(HomeController.username);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", HomeController.username);
            connectedUsers.Remove(HomeController.username);
            //await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
