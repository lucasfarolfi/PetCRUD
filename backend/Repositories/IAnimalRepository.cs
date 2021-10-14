using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IAnimalRepository
    {
        Task<IEnumerable<Animal>> GetAnimals(); //Retorna Todos os animais
        Task<Animal> GetAnimal(string id); //Retorna Um animal
        Task<IEnumerable<Animal>> GetAnimalByName(string name); //Retorna pelo nome
        Task<IEnumerable<Animal>> GetAnimalByType(string type); //Retorna pelo tipo

        Task CreateAnimal(Animal animal); //Cria um animal
        Task<bool> UpdateAnimal(string id, Animal animal); //Atualiza um animal
        Task<bool> DeleteAnimal(string id); //Deleta um animal
    }
}