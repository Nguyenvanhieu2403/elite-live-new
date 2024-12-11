using Authpb;
using Dapper;
using elite_live_datacontext.DataBase;
using elite_live_datacontext.Dto;
using elite_live_repository.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace elite_live_repository
{
    public class AuthRepository : IAuthRepos
    {
        private readonly List<UserDto> _users = new List<UserDto>
        {
            new UserDto { Id = 1, UserName = "user1", Password = "password1" }
        };
        private readonly IConfiguration _configuration;
        public AuthRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public UserDto Authenticate(string username, string password)
        {
            //var connectPostgres = new ConnectPostgres(_configuration);
            //using var connection = connectPostgres.CreateConnection();
            //connection.Open();
            //var query = @"SELECT ""Id"", ""UserName"", ""Password"", ""RoleId"", ""DisplayName"", 
            //             ""Email"", ""Mobile"", ""Address"", ""Permission"", ""ApplicationType""
            //      FROM dbo.""Users""
            //      LIMIT 10";

            //var users =  connection.Query<UserDto>(query);

            var user = _users.SingleOrDefault(x => x.UserName == username && x.Password == password);
            return user;
        }
    }
}
