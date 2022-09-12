//game logic
class Game {
    //game properties
    foundCircles = 0
    totalCircles = 0
    searchColor = "#99FF00"
    normalColor = "#7700AA"
    gameZone = document.getElementById("gameZone")
    foundBar = new FoundBar()
    
    constructor() {
        //create circles
        for(let i=0; i<25; i++) {
            //create new circle
            let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

            //circle style class
            newCircle.classList.add("gameCircle")
            newCircle.setAttribute("cx", Math.random() * 400)
            newCircle.setAttribute("cy", Math.random() * 400)

            //randomly choose reveal color for the circle
            if(Math.random() < .3) {
                //set to be the 'looking for' color
                newCircle.dataset.hiddenColor = this.searchColor
                this.totalCircles++
            } else {
                newCircle.dataset.hiddenColor = this.normalColor
            }

            //mouse events
            //on mouseover, show the hidden color in the data-hiddencolor attribute
            newCircle.addEventListener("mouseover", (event) => {
                event.target.style.fill = event.target.dataset.hiddenColor
            })

            newCircle.addEventListener("mouseout", (event) => {
                event.target.style.fill = "#000"
            })

            newCircle.addEventListener("click", (event) => {
                //if the user clicks on a circle with the 'looking for' color
                if(event.target.dataset.hiddenColor == this.searchColor) {
                    event.target.remove()

                    //store how many have been clicked
                    this.foundCircles++

                    //update found bar
                    this.foundBar.setPercent(this.foundCircles / this.totalCircles)
                }
            })


            //add circle to the screen
            this.gameZone.appendChild(newCircle)
        }
    }
}

//Bar that increases with each found circle
class FoundBar {
    //foundbar properties
    element = document.getElementById("foundBar")
    maxSize = 130
    percent = 0
    
    setPercent(percent) {
        this.percent = percent
        this.element.setAttribute("width", this.percent * this.maxSize)
    }
}

let g = new Game()