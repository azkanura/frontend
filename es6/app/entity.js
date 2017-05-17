class Entity{

  constructor(name,height){
    this.name=name;
    this.height=height;
  }

  greet(){
    console.log(`hallo, i'm ${this.name}, I'm ${this.height} tall`);
  }
}

export default Entity;
