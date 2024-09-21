import * as fs from 'fs/promises';

// Define the structure of the input data
interface FuelData {
  fuel_level: number;
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Define the structure for the output FuelFillEvent
interface FuelFillEvent {
  start_time: number;
  end_time: number;
  fuel_filled: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Function to calculate fuel fill events and total consumption
function processFuelData(fuelData: FuelData[]): { fuelFillEvents: FuelFillEvent[], totalFuelConsumed: number } {
  let totalFuelConsumed = 0;
  let lastFuelLevel = fuelData[0].fuel_level;
  let fuelFillEvents: FuelFillEvent[] = [];
  let currentEventStart: number | null = null;

  // Traverse through the data to find fuel fill events and calculate consumption
  for (let i = 1; i < fuelData.length; i++) {
    const currentFuelLevel = fuelData[i].fuel_level;
    const fuelDifference = currentFuelLevel - lastFuelLevel;

    if (fuelDifference > 0) {
      // Start of a fuel fill event
      if (currentEventStart === null) {
        currentEventStart = fuelData[i - 1].timestamp;
      }

      // End of the fuel fill event
      fuelFillEvents.push({
        start_time: currentEventStart,
        end_time: fuelData[i].timestamp,
        fuel_filled: fuelDifference,
        location: fuelData[i].location,
      });

      currentEventStart = null; // Reset the event start
    }

    // Accumulate total fuel consumption
    if (fuelDifference < 0) {
      totalFuelConsumed += Math.abs(fuelDifference);
    }

    lastFuelLevel = currentFuelLevel;
  }

  return { fuelFillEvents, totalFuelConsumed };
}

// Function to read fuel data and process it
async function readAndProcessFuelData(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const fuelDataArray: FuelData[] = JSON.parse(data);

    // Process the fuel data and output the results
    const { fuelFillEvents, totalFuelConsumed } = processFuelData(fuelDataArray);

    // Output the fuel fill events
    fuelFillEvents.forEach(event => {
      console.log(`Fuel Filled: ${event.fuel_filled} liters`);
      console.log(`Start time: ${new Date(event.start_time).toLocaleString()}`);
      console.log(`End time: ${new Date(event.end_time).toLocaleString()}`);
      console.log(`Location: (${event.location.latitude}, ${event.location.longitude})`);
      console.log('---------------------------------------');
    });

    // Output the total fuel consumed
    console.log(`Total fuel consumed for the day: ${totalFuelConsumed} liters`);

  } catch (error) {
    console.error('Failed to read and process fuel data:', error);
  }
}

// Call the function with the path to your JSON file
readAndProcessFuelData('./response.json'); // Make sure the path is correct
