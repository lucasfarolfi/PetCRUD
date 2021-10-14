using System.Collections.Generic;
using backend.Models;
using MongoDB.Driver;

namespace backend.Data
{
    public class AnimalContextSeed
    {
        public static void SeedData(IMongoCollection<Animal> productCollection)
        {
            bool existAnimal = productCollection.Find(a => true).Any();
            if(!existAnimal){
                productCollection.InsertManyAsync(GetMyAnimals());
            }
        }

        private static IEnumerable<Animal> GetMyAnimals(){
            return new List<Animal>()
            {
                new Animal(){
                    Id = "6163995ef5b72143d070818b",
                    Name = "Zeus",
                    Type = "Cachorro",
                    Weight = 10.0f,
                    Date = "2020-10-25"
                },
                new Animal(){
                    Id = "6163995ef5b72143d070818a",
                    Name = "Lili",
                    Type = "Gato",
                    Weight = 2.5f,
                    Date = "2015-01-15"
                },
                new Animal(){
                    Id = "6163995ef5b72143d0708189",
                    Name = "Totó",
                    Type = "Cachorro",
                    Weight = 4.0f,
                    Date = "2014-03-20"
                }
            };
        }
    }
}