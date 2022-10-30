
export default {
  generateId: function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9)
  },
  scaleSlideCTAs: function(oldSize, newSize, ctas) {
    //Scale each cta
    let result = JSON.parse(JSON.stringify(ctas))
    for(var i=0; i < ctas.length; i++) {
      let position = this.scale(
        {x: oldSize.width, y: oldSize.height},
        {x: newSize.width, y: newSize.height},
        {x: ctas[i].position.x, y: ctas[i].position.y})
      let size = this.scale(
        {x: oldSize.width, y: oldSize.height},
        {x: newSize.width, y: newSize.height},
        {x: ctas[i].size.width, y: ctas[i].size.height})
      //console.log('size: ', size, ' position: ', position)
      result[i].position.x = position.x
      result[i].position.y = position.y
      result[i].size.width = size.x
      result[i].size.height = size.y
    }
    //console.log('---------------------------')
    return result
  },
  scale: function(from, to, values) {
    let scaleX = this.round(values.x * to.x / from.x, 3)
    let scaleY = this.round(values.y * to.y / from.y, 3)
    return {x: scaleX, y: scaleY}
  },
  eventKeyCode: function(event, callback) {
    let code;
    if (event.key !== undefined) {
      code = event.key;
    } else if (event.keyIdentifier !== undefined) {
      code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }
    callback(code);
  },
  appendPercentageValues(presentation, dimensions) {
    let xFactor = 100 / dimensions.width
    let yFactor = 100 / dimensions.height
    for(let i = 0; i < presentation.slides.length; i++) {
      for(let j = 0; j < presentation.slides[i].ctas.length; j++) {
        let percentage = {
          position: {
            x: this.round(presentation.slides[i].ctas[j].position.x * xFactor, 3),
            y: this.round(presentation.slides[i].ctas[j].position.y * yFactor, 3)
          },
          size: {
            width: this.round(presentation.slides[i].ctas[j].size.width * xFactor, 3),
            height: this.round(presentation.slides[i].ctas[j].size.height * yFactor, 3),
          }
        }
        presentation.slides[i].ctas[j].percentage = percentage
      }
    }
  },
  round: function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
}
