# Sudoku Solver

A modern web application for solving Sudoku puzzles built with React and Flask.

![Sudoku Solver](https://i.imgur.com/example.png) <!-- Replace with actual screenshot when available -->

## Features

- Clean, modern UI built with React and styled-components
- Responsive design that works on desktop and mobile devices
- Backtracking algorithm for solving any valid Sudoku puzzle
- Visual highlighting of related cells (row, column, box) after solving
- About page with project information

## Technology Stack

### Frontend
- React
- styled-components for styling
- axios for API requests
- React Router for navigation

### Backend
- Flask (Python)
- RESTful API design

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.8+
- pip

### Frontend Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/sudoku-solver.git
   cd sudoku-solver/react-sudoku-solver
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Build the React app
   ```
   npm run build
   ```

### Backend Setup
1. Set up a Python virtual environment (optional but recommended)
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

2. Install the required Python packages
   ```
   pip install -r requirements.txt
   ```

3. Run the Flask server
   ```
   python server.py
   ```

4. Open your browser and visit `http://localhost:5000`

## How to Use

1. Enter digits (1-9) in the cells where you already know the values
2. Click "Solve Puzzle" to find the solution
3. Use "Clear Grid" to reset the board
4. After solving, click on any cell to highlight related cells

## Development

### Running the Frontend in Development Mode
```
npm start
```

### Running the Backend in Development Mode
```
python server.py
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Hilal - [GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Thanks to everyone who has contributed to the project
- Inspired by the love for logic puzzles and clean code 