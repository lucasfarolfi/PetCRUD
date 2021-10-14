using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public interface IAnimalContext
    {
        IMongoCollection<Animal> Animals {get;}
    }
}