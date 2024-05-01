class Car {
   brand
   model
   speed = 0
   #isTrunkOpen

   constructor(carDetails) {
      this.brand = carDetails.brand
      this.model = carDetails.model

      this.#isTrunkOpen = false
   }

   displayInfo() {
      const trunkStatus = this.#isTrunkOpen === true ? 'opened' : 'closed'
      console.log(`${this.brand} - ${this.model}, Speed: ${this.speed} km/h, Trunk Status: ${trunkStatus}`)
   }

   go() {
      if (!this.#isTrunkOpen) {
         this.speed += 5
      }

      if (this.speed > 200) {
         this.speed = 0
      }
   }

   brake() {
      if (this.speed > 0) {
         this.speed -= 5

      }
   }

   openTrunk() {
      if (this.speed === 0) {
         this.#isTrunkOpen = true
      }
   }

   closeTrunk() {
      this.#isTrunkOpen = false
   }


}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' })
const car2 = new Car({ brand: 'Tesla', model: 'Prius 3' })

class RaceCar extends Car {
   acceleration

   constructor(carDetails) {
      super(carDetails)
      this.acceleration = carDetails.acceleration
   }

   go() {
      this.speed += this.acceleration
      if (this.speed > 300) {
         this.speed = 300
      }
   }

   openTrunk() {
      return ''
   }

   closeTrunk() {
      return ''
   }

   displayInfo() {
      console.log(`${this.brand} - ${this.model}, ${this.speed}km/h`);
   }

}

const raceCar1 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 })

raceCar1.go()
raceCar1.brake()
raceCar1.displayInfo()

car1.openTrunk()
car1.go()
car1.displayInfo()
// const carBrands = [{ brand: 'Toyota', model: 'Corolla' }, { brand: 'Tesla', model: 'Prius 3' }].map(carBrand => new Car(carBrand))

// carBrands.forEach(carBrand => {
//    console.log(carBrand.displayInfo());
// })
