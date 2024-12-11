using elite_live_datacontext.DataBase;
using elite_live_datacontext.Model;
using elite_live_datacontext.Utils;
using elite_live_repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Configuration;

namespace elite_live_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthRepos _authRepos;

        public AuthController(IConfiguration config, IAuthRepos authRepos)
        {
            _config = config;
            _authRepos = authRepos;
        }

        [HttpPost("login")]
        public  IActionResult Login(LoginModel loginModel)
        {
            var user = _authRepos.Authenticate(loginModel.Username, loginModel.Password);

            if (user == null)
                return Unauthorized();

            var accessToken = TokenUtils.GenerateAccessToken(user, _config["Jwt:Secret"]);
            var refreshToken = TokenUtils.GenerateRefreshToken();

            var response = new TokenResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };

            return Ok(response);
        }

        [HttpPost("refresh")]
        public IActionResult Refresh(TokenResponse tokenResponse)
        {
            var newAccessToken = TokenUtils.GenerateAccessTokenFromRefreshToken(tokenResponse.RefreshToken, _config["Jwt:Secret"]);

            var response = new TokenResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = tokenResponse.RefreshToken
            };

            return Ok(response);
        }
    }
}
