using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Threading.Tasks;
using backend.Config;
using backend.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using backend.Repositories;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Controller]
    [Route("api/v1/[controller]")]
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
            return CreatedAtRoute("GetAnimal", new {id = a.Id}, a); //Retorna o produto
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Animal a){
            if(a is null){
                return BadRequest("Dados inváldos");
            }
            return Ok(await _repository.UpdateAnimal(a));
        }
        
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id){
            if(id is null){
                return BadRequest("Dados inválidos");
            }
            return Ok(await _repository.DeleteAnimal(id));
        }
    }
}