using Authpb;
using elite_live_datacontext.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace elite_live_repository.Interfaces
{
    public interface IAuthRepos
    {
        UserDto Authenticate(string username, string password);
    }
}
