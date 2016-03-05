d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    }); 
};

d3.selection.prototype.moveCircles = function(move) { 

   	return this.transition().duration(600).attr('transform', function(d) { 
        k =d3.select(this).attr('transform')
			pieces = k
			masterPieces = k;
			pieces = pieces.split('(')
			p1 = pieces[0]
			p4 = (pieces.length>2) ? getPieces() : ""
			pieces = pieces[1].split(',')
			p3 = pieces[1]
			p2 = pieces[0]
			p2=parseInt(p2)
			newT= (""+p1+"("+(p2+move)+","+p3+p4+"")

			function getPieces(){
				tparts= masterPieces.split(" ")
				assembled = ""
				$(tparts).each(function(d, i){if(i> 0){ assembled += (this +" ") }})
			}

        return newT
    });
};

// Moves the text for the opened circle group
d3.selection.prototype.openText = function(tx) { 
	

	this.each(function(d){

		var currentText = d3.select(this)

		var currentClass = currentText.attr('class')
			shiftOver = (parseInt(currentClass.split('subStep_')[1])*20)


		var transformValue = currentText.attr('transform'),
			transformSplit = transformValue.split('translate(')[1].split(','),
			xVal = parseInt(transformSplit[0]),
			yVal_rotateVal =transformSplit[1],
			newX = (xVal + tx - shiftOver);

		var animate = currentText.transition().duration(600)
						.attr('fill', 'black')
						.attr('transform', function(){ return ('translate('+newX+','+yVal_rotateVal+'') })

		return animate;
		
	})
};

// Moves the text for closed circles that come after the opened circle group
d3.selection.prototype.moveText = function(moveRight) { 
	this.each(function(d){
		
		var currentText = d3.select(this)

		var transformValue = currentText.attr('transform'),
			transformSplit = transformValue.split('translate(')[1].split(','),
			xVal = parseInt(transformSplit[0]),
			yVal_rotateVal =transformSplit[1],
			newX = (xVal + moveRight);

		return currentText.transition().duration(600).attr('transform', function(){ return ('translate('+newX+','+yVal_rotateVal+'') })
		
	})
};


function wrapText(text, lineHeight, maxLength){
	console.log(lineHeight)
	text.each(function() {
		lineHeight = (lineHeight==undefined) ? (.8) : lineHeight;

		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			y = text.attr("y"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em"),
			indent = 10;

		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));

			if (tspan.node().getComputedTextLength() > maxLength) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", indent).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}