export class ParticleSystem {
  constructor(canvasElement) {
    this.canvas = canvasElement
    this.ctx = canvasElement.getContext('2d')
    this.particles = []
    this.animate = this.animate.bind(this)
  }

  addConfetti(x, y, count = 30, color = '#ff6b35') {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -6,
        life: 1,
        color,
        size: Math.random() * 4 + 2,
        type: 'confetti',
      })
    }
  }

  addSmoke(x, y, density = 5, color = 'rgba(200,200,200,0.3)') {
    for (let i = 0; i < density; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * -1,
        life: 1,
        color,
        type: 'smoke',
        size: Math.random() * 30 + 10,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles = this.particles.filter(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05
      p.life -= 0.01
      if (p.type === 'confetti') {
        this.ctx.globalAlpha = p.life
        this.ctx.fillStyle = p.color
        this.ctx.fillRect(p.x, p.y, p.size, p.size)
      } else if (p.type === 'smoke') {
        this.ctx.globalAlpha = p.life * 0.5
        this.ctx.fillStyle = p.color
        this.ctx.beginPath()
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        this.ctx.fill()
      }
      return p.life > 0
    })
    this.ctx.globalAlpha = 1
    requestAnimationFrame(this.animate)
  }
}
