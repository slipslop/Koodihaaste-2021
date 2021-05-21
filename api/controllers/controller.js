'use strict';

exports.handlePost = function(req, res) {
    console.log('hi yu!');
    let speed1 = req.body.speed1;
    let speed2 = req.body.speed2;
    let postedVehicle = req.body.vehicle;
    let vehicle = getVehicleData(postedVehicle);
    
    //Käyetty aika
    let distance = req.body.distance;
    let durationAtSpeed1 = calculateDuration(distance, speed1);
    let durationAtSpeed2 = calculateDuration(distance, speed2);
    let timeDiff = calculateTimeDifference(durationAtSpeed1, durationAtSpeed2);

    let timeSpent = {   
                    'speed1'        : durationAtSpeed1, 
                    'speed2'        : durationAtSpeed2,
                    'faster'        : timeDiff.faster,
                    'difference'    : timeDiff.difference 
                };

    let baseConsumption = vehicle.consumption;
    let consumptionAtSpeed1 = calculateFuelConsumption(baseConsumption, speed1);
    let consumptionAtSpeed2 = calculateFuelConsumption(baseConsumption, speed2);
    let totalFuelConsumed1 = calculateTotalFuelConsumed(distance, consumptionAtSpeed1);
    let totalFuelConsumed2 = calculateTotalFuelConsumed(distance, consumptionAtSpeed2);
    let fuelDiff = calculateFuelDifference(totalFuelConsumed1, totalFuelConsumed2);

    let fuelSpent = { 
                    'speed1'        : totalFuelConsumed1,
                    'speed2'        : totalFuelConsumed2,
                    'less'          : fuelDiff.less,
                    'difference'    : fuelDiff.difference,
                };


    res.json({ timeSpent, fuelSpent });

}

function getVehicleData( letter ){

    switch( letter ) {
        case 'A':
            return { 'speed' : 1, 'consumption' : 3, 'distance' : 100 };
            break;
        case 'B':
            return { 'speed' : 1, 'consumption' : 3.5, 'distance' : 100 };
            break;
        case 'C':
            return { 'speed' : 1, 'consumption' : 4, 'distance' : 100 };
            break;
        default:
            return { 'speed' : 1, 'consumption' : 3, 'distance' : 100 };
            break;
    }

}

function calculateDuration(distance, speed) {
    let durationInHours = distance / speed;
    return toMinutes(durationInHours);
}

function calculateTimeDifference(time1, time2){

    if( time1 > time2 ) {
        return { 'faster' : 'speed2', 'difference' : time1 - time2, 'unit' : 'min' }

    }

    return { 'faster' : 'speed1', 'difference' : time2 - time1, 'unit' : 'min'};

}

function calculateFuelConsumption(baseConsumption, speed){
    const consumptionMultiplier = 1.009;
    return baseConsumption + Math.pow(consumptionMultiplier, speed);
}

function calculateTotalFuelConsumed(distance, consumptionPerHunderdKilometers) {
    return ( distance / 100 ) * consumptionPerHunderdKilometers;
}

function calculateFuelDifference(consumption1, consumption2){

    if( consumption1 > consumption2 ) {
        return { 'less' : 'speed2', 'difference' : consumption1 - consumption2, 'unit' : 'l' }

    }

    return { 'less' : 'speed1', 'difference' : consumption2 - consumption1, 'unit' : 'l'};

}

function toMinutes(hours) {
    return hours * 60;
}
