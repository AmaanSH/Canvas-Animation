var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context - returning drawing context
var c = canvas.getContext('2d');

var maxRadius = 40;

var mouse = 
{

    x: undefined,
    y: undefined

}

var colourArray = 
[

    '#00BFBD',
    '#007F7E',
    '#00FFFC',
    '#00403F',
    '#00E5E2',

]

window.addEventListener('mousemove', function(event) {


    mouse.x = event.x;
    mouse.y = event.y;

})

// ensures canvas is full width height of browser
window.addEventListener('resize', function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

});

// object
function Circle(x, y, dx, dy, radius, colour)
{

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function()
    {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill() 

    }

    this.update = function()
    {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
        {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
        {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
        {
            if (this.radius < maxRadius)
            {
                this.radius += 1;
            }
        } 
        
        else if(this.radius > this.minRadius) 
        {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init()
{
    circleArray = [];

    for (var i = 0; i < 800; i++)
    {
        // random radius
        var radius = Math.random() * 10 + 1;

        // Radius getting stuck
        // Fix - Spawning random co-ordinate from 30 minus the diameter, stops the circle getting stuck
        // subrtract dimeter from innerwidth and ensure x co is bigger than radius
        var x = Math.random() * (innerWidth - radius * 2) + radius;

        // minus radius from innerHeight and then plus radius to stop it from getting stuck on top
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        // velocity can get - or + value and can amp up speed by multiplying factor
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);

        // generates random colour
        // var red = Math.floor(Math.random() * 255)
        // var green = Math.floor(Math.random() * 255)
        // var blue = Math.floor(Math.random() * 255)

        // var colour = "rgba(" + red + "," + green + "," + blue + ")"

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate()
{

    // we want to be able to create a loop, call animate function
    requestAnimationFrame(animate);

    // clears the canvas
    c.clearRect(0, 0, innerWidth, innerHeight)

    // calls update function for the length of circle array
    for (var i = 0; i < circleArray.length; i++)
    {
        circleArray[i].update();
    }

}

init();
animate();
