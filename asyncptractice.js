
/**
 * 
 * asynchronous programming (the time you wait for someting to finish with your promoise)
 * Promise? You request something (something) That something is giving to a (fetch()). 
 * THe fetch() makes a promise to get your something on to the (request) table at the fetching station.
 * The fetching station makes a promise to you, that it will try to deliver your request. While that 
 * fetching officer is working on your request, you need to wait (await). If you dont, well there wont
 * be crap there to check on ( {}, [] [object], <Promise>, ...). When the officer is done trying to deliver your 
 * request, they will bring back an envelope with some tagnames hanging off of it. One if the tags is called "ok",
 * if the envelope has your (response)
, then the tag will say true when you flip it over, if not false. You can check by trying to open up the envelope.
Its gonna say one of those things we mentioned before...

Examples of how it looks like in code
async await

async goes infront of the function that needs to wait for a promise beofre the next "thing" can happen. 
if not, when you try to do something with that "item", it will be empty, null, etc o undefine too

await whatever we need to wait on before moving. Lets say a console loggin Name bfore name has a chance to come back.


async function (){
  const envelope = await responseFromRepient()
  console.log(envelope) <-- this wont happen, it will wait for the "await" to finish first

}
* 
https://www.google.com/search?q=apples
 */
function no(){}


class Dog{
    constructor(furryAnimal, lovingPet){
        this.furA = furryAnimal;
        this.lovingPet = lovingPet;

    }static bark(){
    console.log("woof")
    
    }
}

Dog.bark()


let word = "cherry coke"

const url = `https://www.google.com/search?q=${word}`

function scope(word){

}

async function googleSearch(){
    try {
        const dietCoke = await fetch(url)
        
        console.log(`${dietCoke}`);
        setTimeout(()=>{
            console.log("timeout");
        },2000)
        console.log("Logging")
        const dietCokeTwo = await fetch( `https://www.google.com/search?q=dietflower`)
        console.log(dietCokeTwo)
    } catch (err) {
        console.log(err)
        
    }
}
googleSearch()