const Car = require('../models/Car');


exports.getCars=async(req,res)=>{
    const cars=await Car.find()
    res.json(cars);
};

exports.addCar=async(req,res)=>{
    const newCar=new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
}

exports.getCardetails = async (req, res) => {
      try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};