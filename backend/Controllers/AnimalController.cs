using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [Controller]
    [Route("api/animais")]
    public class AnimalController : ControllerBase
    {
        private readonly IAnimalRepository _repository;  
        public AnimalController(IAnimalRepository repository){
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet]
        public async Task<ActionResult> GetAll(){
            var animals = await _repository.GetAnimals();
            return Ok(animals);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult> GetOne(string id){
            var animal = await _repository.GetAnimal(id);
            if(animal is null){
                return NotFound("Animal não encontrado.");
            }
            return Ok(animal);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Animal a){
            if(a is null){
                return BadRequest("Dados inválidos");
            }
 
            await _repository.CreateAnimal(a);
            return Ok(a); //Retorna o produto
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Update(string id,[FromBody] Animal a){
            if(a is null){
                return BadRequest("Dados inváldos");
            }
            bool result = await _repository.UpdateAnimal(id, a);

            if(!result){
                return Ok("Nenhum dado foi alterado!");
            }
            return Ok(a);
        }
        
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id){
            if(id is null){
                return BadRequest("Dados inválidos");
            }
            bool result = await _repository.DeleteAnimal(id);
            
            if(!result){
                return NotFound("Animal não encontrado");
            }
            return Ok("Animal deletado com sucesso!");
        }
    }
}