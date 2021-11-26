using System;
using Xunit;
using System.Threading.Tasks;
using Moq;
using backend.Repositories;
using backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using MongoDB.Bson;
using System.Collections.Generic;
namespace backend.tests

{
    public class AnimalControllerTest
    {
        [Fact]
        public void GetAll_WithExistingAnimals_ReturnAnimalsList(){
            //Arrange
            string id = ObjectId.GenerateNewId().ToString(); //Gera um id do mongodb
            var stubAnimalsList = new List<Animal>();

            stubAnimalsList.Add(new Animal {Id=id, Name="Bob", Type="Cachorro", Weight=10, Date="2020-10-01"});
            stubAnimalsList.Add(new Animal {Id=id, Name="Nick", Type="Cachorro", Weight=10, Date="2020-10-01"});
            stubAnimalsList.Add(new Animal {Id=id, Name="Fred", Type="Pássaro", Weight=10, Date="2020-10-01"});

            var repositoryMock = new Mock<AnimalRepository>();
            repositoryMock.Setup(repo => repo.GetAnimals()).Returns(stubAnimalsList);
            
            var animalController = new AnimalController(repositoryMock.Object);

            //Act
            var GetAll = animalController.GetAll();

            //Assert
            Assert.Equal(stubAnimalsList, GetAll.Value);
        }
    }
}
