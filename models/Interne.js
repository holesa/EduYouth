const mongoose = require("mongoose");
const predmetyList = ["architektúra a urbanizmus","bezpečnostné vedy","biológia","biotechnológie","doprava","drevárstvo","ekologické a environmentálne vedy","ekonómia a manažment","elektrotechnika","farmácia","filológia","filozofia","fyzika","geodézia a kartografia","historické vedy","chémia","chemické inžinierstvo a technológie","informatika","kybernetika","lesníctvo","logopédia a liečebná pedagogika","matematika","mediálne a komunikačné štúdiá","obrana a vojenstvo","ošetrovateľstvo","politické vedy","poľnohospodárstvo a krajinárstvo","potravinárstvo","pôrodná asistencia","právo","priestorové plánovanie","psychológia","sociálna práca","sociológia a sociálna antropológia","stavebníctvo","strojárstvo","teológia","učiteľstvo a pedagogické vedy","umenie","vedy o športe","vedy o umení a kultúre","vedy o Zemi","verejné zdravotníctvo","veterinárske lekárstvo","všeobecné lekárstvo","zdravotnícke vedy","získavanie a spracovanie zemských zdrojov","zubné lekárstvo"];
const vyucbaList = ["Prednášky","Hodiny","Poradca na sylaby", "Výučba pri kruhu"];  

const InterneSchema = new mongoose.Schema({
    predemty:{type:Array,default:predmetyList},
    vyucba:{type:Array, default:vyucbaList}
})


module.exports = mongoose.model("Interne", InterneSchema)