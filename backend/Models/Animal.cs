using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Animal
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        //[BsonElement("id")]
        public string Id {get; set;}
        
        [BsonRequired]
        [BsonElement("name")]
        public string Name {get;set;}

        [BsonRequired]
        [BsonElement("type")]
        public string Type {get;set;}

        [BsonRequired]
        [BsonElement("weight")]
        public float Weight {get;set;}

        [BsonRequired]
        [BsonElement("date")]
        public string Date {get;set;}
    }
}