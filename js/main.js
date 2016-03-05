var width = $("#graphicContainer").width()
	height = 300,
	circlePadding = {left: 20, right: 20},
	maxWidth = width/9,  // Largest possible combination of Steps + Substeps 
	maxRadius = (maxWidth - (circlePadding.left + circlePadding.right)) / 2;

var svg = d3.select("#graphicContainer")
			.append("svg")
			.attr('width', width)
			.attr('height', height),
	g = svg.append("g");

var circleGroup = g.selectAll('.doesntexist')
	.data(nestedSteps)
	.enter().append('g')
	.attr('class', function(d){return 'stepGroup stepNumber_'+d.Group+'' });

	var StepData = circleGroup.data()

	var Steps = circleGroup.append('circle')
		.attr('r', maxRadius)
		.attr('fill', function(d){ return colors[d.Group - 1]})
		.attr('fill-opacity', 0.1)
		.attr('stroke', function(d){ return colors[d.Group - 1]})
		.attr('class', function(d){return 'circles '+d.Type+' Group_'+ d.Group+''})

	
	circleText = circleGroup.append('text')
		.text(function(d){return d.Name})
		.attr('class', function(d){return 'stepText '+d.Type+' Group_'+ d.Group+''})
		.attr('font-size', '16px')
		.attr("dy", ".35em")
    	.attr("text-anchor", "start") 
    	.call(wrapText, null, 160)


	nestedSteps.forEach(function(d,i){
		var current = d3.select('.stepNumber_'+(i+1)+''),
			subStepList = current.data()[0].SubSteps,
			groupNumber = (i+1);

			substepGroup = current.append('g')
				.attr('class', function(){return 'subStepGroup subStepGroup_'+groupNumber+''})


			substepGroup.selectAll('.subStepCircles')
				.data(subStepList)
				.enter().append('circle')
				.attr('class', function(d,i){return 'circles '+d.Type+' Group_'+ d.Group+' subStep_'+(i+1)+''})
				.attr('r', maxRadius-11)
				.attr('fill', function(d){ return colors[d.Group - 1]})
				.attr('fill-opacity', 0.5)

			substepGroup.selectAll('.subStepText')
				.data(subStepList)
				.enter().append('text')
				.text(function(d, i){return d.Group+'.'+(i+1)+' '+d.Name})
				.attr('class', function(d,i){return 'subStepText Group_'+ d.Group+' subStep_'+(i+1)+''})
				.attr('substep', function(d,i){return (i+1)})
				.attr('font-size', '12px')
				.attr("dy", ".35em")
		    	.attr("text-anchor", "start") 

		if(groupNumber==nestedSteps.length){
			addActions()
			style()
		}

	})

function style (){
	d3.selectAll(".stepText")
		.transition().duration(600)
		.attr("transform", function(d,i){return "translate("+((maxWidth*i)+(maxRadius))+","+(height/2+(maxRadius+20))+") rotate(25)"})
	
	d3.selectAll(".subStepText")
		.attr('fill', 'none')
		.transition().duration(600)
		.attr("transform", function(d,i){ 
			stepNum = (d3.select(this).attr('substep'))
			return "translate("+((maxWidth*(d.Group-1))+(maxRadius+circlePadding.left)+ (20*stepNum))+","+(height/2-maxRadius-20+(5*stepNum))+") rotate(-25)"})


	d3.selectAll(".circles")
		.transition().duration(600)	
		.attr("transform", function(d,i){return "translate("+((maxWidth*(d.Group-1)+circlePadding.left)+maxRadius)+","+(height/2)+")"})
	

	d3.selectAll('.SubStep')
		.attr('fill-opacity', 0.5);

}


function addActions(){
	Steps = d3.selectAll('.Step')
	Steps.moveToFront()
	Steps.on('click', function(d){
		return closeCircles(d.Group)
	})

	SubSteps = d3.selectAll('.SubStep')
		.on('click', toggleText)
}



tWidth = 0;
openGroup = null;

function closeCircles(clickedStep, substepTarget){

	console.log(clickedStep)
	style()

	substepTarget = ((substepTarget==null)||(substepTarget==undefined)) ? 1 : substepTarget
	
	setTimeout(function() {
      openCircles(clickedStep, substepTarget)
	}, 600);
	
}

function openCircles(thisGroup, substepTarget){

	var totalWidth = 0;

	var subSteps = d3.selectAll('.Group_'+thisGroup+'.SubStep')
		.each(function(d){ totalWidth += (d3.select(this).node().getBBox().width+20) })

	tWidth = totalWidth


	d3.selectAll('.circles').filter(function(d,i){return d.Group>thisGroup}).moveCircles(totalWidth)
	d3.selectAll('text').filter(function(d,i){return d.Group>thisGroup}).moveText(totalWidth, thisGroup)
	
	 
	subSteps.each(function(d,i){
		var thisCircle = d3.select(this),
			tx = ((i+1)*(30+thisCircle.node().getBBox().width)),
			position = (thisCircle.node().getBBox().x);

		thisCircle.moveCircles(tx)
		d3.select('.Group_'+thisGroup+'.subStepText.subStep_'+(i+1)+'').openText(tx)
		


	})
	

	$('[name=stepText]:visible').slideToggle('hide')

	$('[data-step="'+thisGroup+'.'+substepTarget+'"]').slideToggle('show')

	highlightSubStep(thisGroup, substepTarget)

}

function highlightSubStep(group, step){
	d3.selectAll('.SubStep').attr('fill-opacity', 0.5);
	d3.select('.circles.Group_'+group+'.subStep_'+step+'')
		.transition().duration(500).delay(1000)
		.attr('fill-opacity', 1)
}
function toggleText (d){	
	$('[name=stepText]:visible').slideToggle('hide')
	$('[data-step="'+d.StepValue+'"]').slideToggle('show')

	splitter= d.StepValue.split('.')
	highlightSubStep(splitter[0], splitter[1])

}

function forceTextToggle(step){
	$('[name=stepText]:visible').slideToggle('hide')
	$('[data-step="'+step+'"]').slideToggle('show')

	splitter= step.split('.')
	highlightSubStep(splitter[0], splitter[1])
}
function skipToStep (step, substep){
	console.log(step, substep)
	closeCircles(step, substep)
	$('[name=stepText]:visible').hide()
	$('[data-step="'+step+'.'+(substep+1)+'"]').slideToggle('show')
}

setTimeout(function(){
	closeCircles(1)
}, 1000)