# Income Calculator Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Income Tax Calculator Application aims to provide a close-to-accurate and straightforward way to calculate your net income after federal and state taxes. It considers various tax brackets and deductions to give you a detailed breakdown of your income, taxes, and take-home pay. Designed for both salaried and hourly employees, this tool can help you plan your finances more effectively.

## Features

- **Multiple Income Types**: Supports both salaried and hourly income calculations.
- **Detailed Tax Breakdown**: Provides a breakdown of federal and state taxes, including Medicare, Social Security, and other state-specific taxes.
- **Configurable Inputs**: Allows users to enter specific details like hours worked per week, hourly wage, or yearly salary.
- **Taxable Income Estimation**: Utilizes an estimated percentage of gross income as taxable income for more accurate tax calculations.
- **Flexible**: Easily extendable to include additional features like tax deductions, tax credits, or support for more states.

## Technologies

- TypeScript
- React
- NextJS
- TailwindCSS

## Installation and Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/nyedr/income_calculator.git
    ```

2. **Navigate to Project Directory**

    ```bash
    cd income-tax-calculator
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Environment Variables**

    Create a `.env` file in the root directory and populate it with the necessary variables.

5. **Run the Application**

    ```bash
    npm run dev
    ```

## Usage

1. **Home Page**: Navigate to `http://localhost:3000/` to access the application.
2. **Input Details**: Enter your income details, such as hourly wage or yearly salary, along with the type of income (hourly/salary).
3. **Calculate**: Click on the "Calculate" button to view the detailed breakdown.

## Contributing

Feel free to submit pull requests for new features, bug fixes, or improvements. Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE) file for details.
