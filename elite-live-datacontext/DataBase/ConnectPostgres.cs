using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace elite_live_datacontext.DataBase
{
    public class ConnectPostgres
    {
        private readonly string _connectionString;

        public ConnectPostgres(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PgDbConnection");
        }

        public IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);
    }
}
