class Traveler {
    constructor(name){
        this._name = name;
        this._foodQty = 1;
        this._isHealth = true;

    }

    get data(){
        let status = 'Healthy';
        if(!this._isHealth){
            status = 'sick'
        }
        let dataMsg = `Name: ${this._name}. Food Qty: ${this._foodQty}. Status: ${status}`
        return dataMsg
    }

    hunt(){
        let newQty = this._foodQty+ 2;
        this._foodQty = newQty;
        return `Now ${this._name} has ${newQty} amount of food`;
    }

    eat(){
        let currentQty = this._foodQty;

        if(currentQty > 0){
            let newQty = currentQty - 1;
            this._foodQty= newQty;

            return `Now ${this._name} has ${newQty} amount of food`;
        }
        else if(currentQty === 0){
            this._isHealth = false;
            return `Not enough food, ${this._name} is now sick`
        }
    }
}
// let juan = new Traveler('Juan');

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passengers = [];
    }

    set newCapacity(newCapacity) {
        return this._capacity = newCapacity;
    }
    get status() {
        const occupiedSeats = this._passengers.length;
        return `This wagon has ${this._capacity} seats, of which ${occupiedSeats} are occupied`
    }

    getAvailableSeatCount(){
        const occupiedSeats = this._passengers.length;
        const totalCapacity = this._capacity;
        let availableSeats = totalCapacity - occupiedSeats;

        let msgSingular = `There are ${availableSeats} seat remaining`;

        let msgPlural = `There are ${availableSeats} seats remaining`;

        return (availableSeats === 1 ? msgSingular : msgPlural);
    }

    join(passenger) {
        const occupiedSeats = this._passengers.length;

        if(occupiedSeats >= this._capacity){
            return `All the seats are occupied!`;
        }
        this._passengers.push(passenger);
        return passenger;
    }

    shouldQuarantine(){
        const passengersList = this._passengers;
        let status = false;

        passengersList.forEach(person => {
            if(!person._isHealth){
                status = true;
            }
        });

        return status;
    }

    totalFood(){
        const passengersList = this._passengers;
        let foodQtyList = [];
        let totalFood = 0;

        passengersList.forEach(person => {
            foodQtyList.push(person._foodQty)
        });

        totalFood = foodQtyList.reduce((acc, current) => acc + current);

        return totalFood;
    }
}


// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');
 
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
 
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
 
wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
 
henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)
 
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);