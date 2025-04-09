from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='build')

def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(3):
        for j in range(3):
            if board[start_row + i][start_col + j] == num:
                return False
    return True

def solve_sudoku(board):
    empty = find_empty_location(board)
    if not empty:
        return True  
    row, col = empty
    for num in range(1, 10):
        if is_valid(board, row, col, num):
            board[row][col] = num
            if solve_sudoku(board):
                return True
            board[row][col] = 0  
    return False

def find_empty_location(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return i, j
    return None

@app.route('/api/solve', methods=['POST'])
def solve():
    try:
        board = []
        for i in range(9):
            row = []
            for j in range(9):
                cell = int(request.form.get(f'cell-{i}-{j}', 0))
                row.append(cell)
            board.append(row)
        
        if solve_sudoku(board):
            return jsonify(board)
        else:
            return jsonify({"error": "No solution found"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True) 