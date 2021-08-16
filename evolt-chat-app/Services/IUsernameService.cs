using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace evolt_chat_app.Services
{
    public interface IUsernameService
    {
        string SetUsername();
        string GetUsername();
    }
}
