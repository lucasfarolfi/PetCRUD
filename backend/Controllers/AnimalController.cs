using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Cors;
using backend.Data;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Controller]
    [Route("api/animais")]
    public class AnimalController : ControllerBase
    {
        private readonly AnimalRepository _repository;  
        public AnimalController(AnimalRepository repository){
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet]
        public ActionResult<List<Animal>> GetAll(){
            return _repository.GetAnimals();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<Animal> GetOne(string id){
            var animal = _repository.GetAnimal(id);
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
 
            var animal = await _repository.CreateAnimal(a);
            return Created("api/animais/"+animal.Id,animal); //Retorna o produto
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id,[FromBody] Animal a){
            var animalFound = _repository.GetAnimal(id);
            if(a is null || id is null || animalFound is null){
                return NotFound();
            }
            _repository.UpdateAnimal(id, a);
            return NoContent();
        }
        
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id){
            var a = _repository.GetAnimal(id);
            if(a is null || id is null){
                return NotFound();
            }
            _repository.DeleteAnimal(id);
            return NoContent();
        }
    }
}