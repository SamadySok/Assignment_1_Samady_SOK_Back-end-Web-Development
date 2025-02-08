const readline = require("readline-sync");

// Function to get a valid number input
function getValidNumber(promptMessage) {
    let input = readline.question(promptMessage);
    let number = parseFloat(input);
    return number;
}

// Function to calculate salary
function calculateSalary(position, hoursWorked) {
    let hourlyRate;

    // Assign hourly rate using switch-case
    switch (position.toLowerCase()) {
        case "manager":
            hourlyRate = 40;
            break;
        case "developer":
            hourlyRate = 30;
            break;
        case "intern":
            hourlyRate = 15;
            break;
        default:
            throw new Error("Invalid position! Please enter Manager, Developer, or Intern.");
    }

    // Calculate salary and overtime
    let baseSalary = hourlyRate * Math.min(hoursWorked, 160);
    let overtimeBonus = hoursWorked > 160 ? (hoursWorked - 160) * (hourlyRate * 1.5) : 0;
    let totalSalary = baseSalary + overtimeBonus;

    return { hourlyRate, baseSalary, overtimeBonus, totalSalary };
}

// Main function to handle multiple employees
function main() {
    console.log("\n📌 Employee Salary Calculator - Node.js Terminal App");

    let employeeCount = getValidNumber("Enter the number of employees: ");
    
    // Use for loop to process multiple employees
    for (let i = 1; i <= employeeCount; i++) {
        let position = readline.question("Enter position (Manager, Developer, Intern): ");
        let hoursWorked = getValidNumber("Enter hours worked: ");
        
        let positionError = false;
        let hoursError = false;
        
        // Check if position is valid
        if (!["manager", "developer", "intern"].includes(position.toLowerCase())) {
            console.log("❌ Invalid position! Please enter one of the following: Manager, Developer, Intern.");
            positionError = true;
        }

        // Check if hours worked is valid (non-negative)
        if (isNaN(hoursWorked) || hoursWorked < 0) {
            console.log("❌ Invalid input for hours worked! Please enter a valid positive number.");
            hoursError = true;
        }

        // If both position and hours are invalid, display both error messages
        if (positionError && hoursError) {
            console.log("❌ Both position and hours worked are invalid! Skipping this employee...\n");
            continue; // Skip this employee
        }

        // If only position is invalid, display position error and skip
        if (positionError) {
            console.log("❌ Skipping this employee due to invalid position...\n");
            continue; // Skip this employee
        }

        // If only hours worked is invalid, display hours error and skip
        if (hoursError) {
            console.log("❌ Skipping this employee due to invalid hours worked...\n");
            continue; // Skip this employee
        }

        try {
            // Calculate salary
            let salaryDetails = calculateSalary(position, hoursWorked);

            // Display results
            console.log("\n========= Salary Details =========");
            console.log(`Position      : ${position}`);
            console.log(`Hours Worked  : ${hoursWorked}`);
            console.log(`Hourly Rate   : $${salaryDetails.hourlyRate}`);
            console.log(`Overtime Bonus: $${salaryDetails.overtimeBonus}`);
            console.log(`Total Salary  : $${salaryDetails.totalSalary}`);
            console.log("==================================\n");

        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
            console.log("Skipping to next employee...");
            continue; // Jump to next iteration if an error occurs
        }
    }

    console.log("\n✅ Salary calculation completed for all employees!\n");
}

// Run the main function
main();
