using System.Collections;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class AnimalRepository 
    {
        private readonly IAnimalContext _context;
        public AnimalRepository(IAnimalContext context){
            _context = context ??
                throw new ArgumentNullException(nameof(context));
        }

        public AnimalRepository(){}

        //Metodos Get
        public virtual List<Animal> GetAnimals()
        {
            return _context.Animals.Find(a => true).ToList();
        }
        public Animal GetAnimal(string id)
        {
            return _context.Animals.Find(a => a.Id == id).FirstOrDefault();
        }
        public virtual List<Animal> GetAnimalByName(string name)
        {
            return _context.Animals.Find(a => a.Name == name).ToList();
        }
        public virtual List<Animal> GetAnimalByType(string type)
        {
            return _context.Animals.Find(a => a.Type == type).ToList();
        }

        //Metodo Create
        public async Task<Animal> CreateAnimal(Animal animal)
        {
            await _context.Animals.InsertOneAsync(animal);
            return animal;
        }

        //Metodo Delete
        public void DeleteAnimal(string id)
        {
            _context.Animals.DeleteOneAsync(a => a.Id == id);
            //DeleteResult deleteResult = await _context.Animals.DeleteOneAsync(a => a.Id == id);
            //return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        //Metodo Update
        public void UpdateAnimal(string id, Animal animal)
        {
            _context.Animals.ReplaceOne(a => a.Id == id, animal);
            //var updateResult = await _context.Animals.ReplaceOneAsync(a => a.Id == id, animal);
            //return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
    }
}