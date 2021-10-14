using backend.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Configuration;

namespace backend.Data
{
    public class AnimalContext : IAnimalContext
    {

        public AnimalContext(IConfiguration configuration){
            var client = new MongoClient(configuration.GetSection("DatabaseSettings")["ConnectionString"].ToString());
            var database = client.GetDatabase(configuration.GetSection("DatabaseSettings")["Database"].ToString());
            Animals = database.GetCollection<Animal>(configuration.GetSection("DatabaseSettings")["Collection"].ToString());

            AnimalContextSeed.SeedData(Animals);
        }

        public IMongoCollection<Animal> Animals {get;}
    }
}