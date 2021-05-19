class ParticleHandler {
    constructor(x, y, dx, dy, rx, ry) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rx = rx
        this.ry = ry

        this.particles = []
        this.colors = [0xaafcba03, 0xaa030ffc, 0xaa03d7fc, 0xaa03fca1, 0xaa00bf13, 0xaaf2ff3b, 0xaaffa600, 0xaaff2a00, 0xaaff00d9, 0xaac300ff]
    }

    step() {
        this.particles.push(
            new Particle(
                this.colors[Math.floor(Math.random() * this.colors.length)], 
                this.x, this.y, 
                this.dx + Math.random() * this.rx, this.dy + Math.random() * this.ry
            )
        )
        this.particles.forEach((particle, index, object) => {
            particle.step()
            if (particle.dy > 0 && particle.y > Renderer.screen.getHeight()) {
                object.splice(index, 1)
            }
        })
    }
    
    draw() {
        this.particles.forEach(particle => particle.draw())
    }
}

class Particle {
    constructor(c, x, y, dx, dy) {
        this.c = c
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.size = Math.random() * 2 + 2
        this.sides = Math.round(Math.random() * 10) + 3
    }

    step() {
        this.dy += 0.25
        this.y += this.dy
        this.x += this.dx
    }

    draw() {
        Renderer.drawCircle(this.c, this.x, this.y, this.size, this.sides)
    }
}

module.exports = ParticleHandler