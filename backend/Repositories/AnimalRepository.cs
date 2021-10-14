using System.Collections;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class AnimalRepository : IAnimalRepository
    {
        private readonly IAnimalContext _context;
        public AnimalRepository(IAnimalContext context){
            _context = context ??
                throw new ArgumentNullException(nameof(context));
        }

        //Metodos Get
        public async Task<IEnumerable<Animal>> GetAnimals()
        {
            return await _context.Animals.Find(a => true).ToListAsync();
        }
        public async Task<Animal> GetAnimal(string id)
        {
            return await _context.Animals.Find(a => a.Id == id).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<Animal>> GetAnimalByName(string name)
        {
            return await _context.Animals.Find(a => a.Name == name).ToListAsync();
        }
        public async Task<IEnumerable<Animal>> GetAnimalByType(string type)
        {
            return await _context.Animals.Find(a => a.Type == type).ToListAsync();
        }

        //Metodo Create
        public async Task CreateAnimal(Animal animal)
        {
            await _context.Animals.InsertOneAsync(animal);
        }

        //Metodo Delete
        public async Task<bool> DeleteAnimal(string id)
        {
            DeleteResult deleteResult = await _context.Animals.DeleteOneAsync(a => a.Id == id);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        //Metodo Update
        public async Task<bool> UpdateAnimal(Animal animal)
        {
            var updateResult = await _context.Animals.ReplaceOneAsync(a => a.Id == animal.Id, animal);
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
    }
}