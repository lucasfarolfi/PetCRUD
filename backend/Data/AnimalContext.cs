using backend.Data;
using backend.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace backend.Data
{
    public class AnimalContext : IAnimalContext
    {

        public AnimalContext(IConfiguration configuration){
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("AnimalCRUD");
            Animals = database.GetCollection<Animal>("Animals");

            AnimalContextSeed.SeedData(Animals);
        }

        public IMongoCollection<Animal> Animals {get;}
    }
}