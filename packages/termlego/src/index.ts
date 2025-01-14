export const Terminal = {
    // Basic control codes
    ESC: '\x1b',
    
    // Screen controls
    clear: '\x1b[2J',
    hideCursor: '\x1b[?25l',
    showCursor: '\x1b[?25h',
    
    // Movement
    moveTo: (x: number, y: number) => `\x1b[${y};${x}H`,
    
    // Colors
    reset: '\x1b[0m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    
    // Drawing characters
    boxChars: {
        topLeft: '┌',
        topRight: '┐',
        bottomLeft: '└',
        bottomRight: '┘',
        horizontal: '─',
        vertical: '│'
    }
};

import { stdout } from 'process';

// Draw a simple box
const drawBox = (x: number, y: number, width: number, height: number) => {
    // Draw top border
    stdout.write(Terminal.moveTo(x, y));
    stdout.write(Terminal.boxChars.topLeft + 
                Terminal.boxChars.horizontal.repeat(width - 2) + 
                Terminal.boxChars.topRight);
    
    // Draw sides
    for (let i = 1; i < height - 1; i++) {
        stdout.write(Terminal.moveTo(x, y + i) + Terminal.boxChars.vertical);
        stdout.write(Terminal.moveTo(x + width - 1, y + i) + Terminal.boxChars.vertical);
    }
    
    // Draw bottom border
    stdout.write(Terminal.moveTo(x, y + height - 1));
    stdout.write(Terminal.boxChars.bottomLeft + 
                Terminal.boxChars.horizontal.repeat(width - 2) + 
                Terminal.boxChars.bottomRight);
};

// Example usage:
const example = () => {
    stdout.write(Terminal.clear);      // Clear screen
    stdout.write(Terminal.hideCursor); // Hide cursor
    
    // Draw a small box
    drawBox(5, 3, 20, 6);
    
    // Add some text inside
    stdout.write(Terminal.moveTo(7, 4));
    stdout.write(Terminal.green + 'Hello, Terminal!' + Terminal.reset);
    
    // Position cursor at bottom
    stdout.write(Terminal.moveTo(0, 10));
    stdout.write(Terminal.showCursor);
};
export { drawBox, example }
