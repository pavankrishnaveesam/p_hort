class Animal {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
}

console.log(new Animal("cat", 4).describe()); //cat has 4 legs
