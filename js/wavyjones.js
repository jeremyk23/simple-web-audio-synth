var WavyJones = function (context, elem) {
	var analyser = context.createAnalyser();

	analyser.width = document.getElementById(elem).offsetWidth;
	analyser.height = document.getElementById(elem).offsetHeight;
	analyser.lineColor = 'yellow';
	analyser.lineThickness = 5;

    var paper = Raphael(elem, analyser.width, analyser.height),
        oscLine = paper.path([['M', 0, analyser.height/2], ['L', analyser.width, analyser.height/2], 'Z']),
        noDataPoints = 10,
		freqData = new Uint8Array(analyser.frequencyBinCount);

    oscLine.attr({stroke: analyser.lineColor, 'stroke-width': analyser.lineThickness});

    var drawLine = function () {
        analyser.getByteTimeDomainData(freqData);

        var graphPoints = [],
            graphStr = '';

        graphPoints.push('M0, ' + (analyser.height/2));

        for (var i = 0; i < freqData.length; i++) {
            if (i % noDataPoints) {
                var point = (freqData[i] / 128) * (analyser.height / 2);
                graphPoints.push('L' + i + ', ' + point); 
            }
        }

        for (i = 0; i < graphPoints.length; i++) {
            graphStr += graphPoints[i];
        }

        oscLine.attr('stroke', analyser.lineColor);
        oscLine.attr('stroke-width', analyser.lineThickness);
        oscLine.attr('path', graphStr);

        setTimeout(drawLine, 100);
    };

    drawLine();

    return analyser;
};


GitHub
About us
Blog
Contact & support
GitHub Enterprise
Site status
Applications
GitHub for Mac
GitHub for Windows
GitHub for Eclipse
GitHub mobile apps
Services
Gauges: Web analytics
Speaker Deck: Presentations
Gist: Code snippets
Job board
Documentation
GitHub Help
Developer API
GitHub Flavored Markdown
GitHub Pages
More
Training
Students & teachers
The Shop
Plans & pricing
The Octodex
© 2013 GitHub Inc. All rights reserved.
Terms of Service Privacy Security
 // JavaScript Document