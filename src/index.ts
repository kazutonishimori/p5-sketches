import * as p5 from 'p5';
import init, { p5SVG } from 'p5.js-svg'

init(p5);
let sketch = (s: p5SVG) => {
    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
        dotGrid();
    }

    s.draw = () => {
        s.background(220);
        time += 0.01;
        dotGrid();
        drawText();
    }
    let xScale = 0.015;
    let yScale = 0.02;
    let gap = 5;
    let time = 0; // Initialize the time variable

    function dotGrid() {
        s.noStroke();
        s.fill(0);

        // Loop through x and y coordinates, at increments set by gap
        for (let x = gap / 2; x < s.width; x += gap) {
            for (let y = gap / 2; y < s.height; y += gap) {
                let noiseValue = s.noise((x + s.mouseX) * xScale, (y + s.mouseY) * yScale, time); // Add 'time' as the third argument
                let diameter = noiseValue * gap;
                let colorValue = noiseValue * 255; // Dynamic color based on noise value
                s.fill(255-colorValue, colorValue, colorValue);
                s.circle(x, y, diameter);
            }
        }
    }

    function drawText() {
        let offsetX = ( s.width / 2) - ((s.mouseX - s.width / 2) * 0.8);
        let offsetY = ( s.height / 2) - ((s.mouseY - s.height / 2) * 0.8) ;
        s.fill(0);
        s.textSize(32);
        s.text('Welcome!', offsetX, offsetY);
        s.text('about me', offsetX + 400, offsetY - 300);
        s.text('lalala', offsetX + s.width/1.5, offsetY - s.height/1.5);
    }

    s.keyPressed = () => {
        if (s.key === 's') {
            exportPNG();
        } else if (s.key === 'S') {
            exportSVG()
        }
    }

    function exportPNG() {
        let filename = (new Date).toISOString()
        s.save(filename.concat(".png"))
    }

    function exportSVG() {
        let filename = (new Date).toISOString()
        s.createCanvas(window.innerWidth, window.innerHeight, s.SVG)
        s.draw()
        s.save(filename.concat(".svg"))
        s.createCanvas(window.innerWidth, window.innerHeight)
        s.draw()
    }

}

const P5 = new p5(sketch, document.body);