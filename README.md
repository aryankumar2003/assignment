Here’s the updated project structure in the `README.md` including all the files like `package.json`, `index.js`, `OutputOfJson.txt`, `tsconfig.json`, and `package-lock.json`.

---

# Fuel Data Processor

This project processes fuel level data to identify fuel fill events and calculate total fuel consumption over a period of time. It reads the data from a JSON file containing fuel level information, timestamps, and locations, then outputs details about when and where fuel was added, and the total fuel consumed.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Example Output](#example-output)
- [License](#license)

## Features
- Detects fuel fill events based on increases in fuel levels.
- Records details such as start and end time of fuel fills and the location.
- Calculates the total fuel consumed based on decreases in fuel levels.
- Reads data from a local `response.json` file and processes it using Node.js.

## Technologies Used
- **TypeScript**: A strongly-typed programming language that builds on JavaScript.
- **Node.js**: JavaScript runtime for running the application.
- **fs**: Node.js module for interacting with the file system.

## Project Structure
```
.
├── index.ts          # Main TypeScript file
├── index.js          # Compiled JavaScript file
├── response.json     # Sample JSON file with fuel data (not included in repository)
├── OutputOfJson.txt  # File containing example output from the fuel data processing
├── tsconfig.json     # TypeScript configuration file
├── package.json      # Node.js project metadata
├── package-lock.json # Dependency lock file
└── README.md         # This README file
```

### File Descriptions
- **`index.ts`**: The main TypeScript file where the core logic of the fuel data processor is implemented.
- **`index.js`**: The JavaScript file compiled from `index.ts` after running TypeScript compilation (`npx tsc index.ts`).
- **`response.json`**: The JSON file containing fuel data input .
- **`OutputOfJson.txt`**: Contains the output from processing the sample fuel data in `response.json`. This helps showcase what the output of the program should look like.
- **`tsconfig.json`**: TypeScript configuration file, specifying compiler options such as target JavaScript version, output directory, and module resolution.
- **`package.json`**: Contains metadata about the project and its dependencies.
- **`package-lock.json`**: Ensures consistent dependency versions across installations.

### `package.json`
Here’s what your `package.json` file might look like:
```json
{
  "name": "fuel-data-processor",
  "version": "1.0.0",
  "description": "A project to process fuel data, identify fuel fill events, and calculate total fuel consumed.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "build": "tsc"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^4.5.4"
  }
}
```

### `tsconfig.json`
This is your TypeScript configuration file:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["index.ts"]
}
```

## Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/aryankumar2003/assignment
   cd assingment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile TypeScript**:
   Ensure you have TypeScript installed globally:
   ```bash
   npm install -g typescript
   ```
   Compile the TypeScript file:
   ```bash
   npm run build
   ```

## Usage

1. **Prepare the JSON file**:
   - The file should have the following structure:
     ```json
     [
       {
         "fuel_level": 50,
         "timestamp": 1632447600,
         "location": {
           "latitude": 40.7128,
           "longitude": -74.0060
         }
       },
       ...
     ]
     ```

2. **Run the program**:
   After compiling, run the JavaScript version of the code:
   ```bash
   npm start
   ```

3. **Expected Output**:
   - The program will print the fuel fill events (when and where fuel was added) and the total fuel consumed.

## Example Output
```
Fuel Filled: 20 liters
Start time: 9/24/2021, 10:00:00 AM
End time: 9/24/2021, 10:05:00 AM
Location: (40.7128, -74.0060)
---------------------------------------
Fuel Filled: 30 liters
Start time: 9/24/2021, 3:00:00 PM
End time: 9/24/2021, 3:10:00 PM
Location: (40.7139, -74.0072)
---------------------------------------
Total fuel consumed for the day: 40 liters
```

The above example output is saved in the `OutputOfJson.txt` file for reference.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This version now includes the `package.json` and additional instructions for handling dependencies and running the project. Make sure to customize the `name`, `author`, and other fields in `package.json` based on your preferences.
