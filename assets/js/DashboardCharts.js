function loadChart(type, container, data, title = '') {
    // Clear the container and add a new canvas
    $(`#${container}`).html(`<canvas id='${container}Canvas'></canvas>`);
    let CNX = document.getElementById(`${container}Canvas`);

    // Create the chart with a custom plugin for drawing text
    new Chart(CNX, {
        type: type,
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    display: false
                },
                title: {
                    display: false,
                    text: ''
                },
                centerText: {
                    fontSize: '1em',     // Adjust summernote size here
                    fontFamily: 'SansOneBold',
                    color: '#353941'     // Text color
                }

            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function(chart) {
                if (title) {
                    var ctx = chart.ctx;
                    var width = chart.width;
                    var height = chart.height;

                    // Split the title into two lines
                    var lines = title.split(' ');
                    var line1,line2;
                    if(lines.length > 1) {
                        line1 = lines[0];
                        line2 = lines[1];
                    }else{
                        line1 = lines[0];
                    }


                    var fontSize = chart.config.options.plugins.centerText.fontSize;
                    var fontFamily = chart.config.options.plugins.centerText.fontFamily;
                    var color = chart.config.options.plugins.centerText.color;

                    ctx.save();
                    ctx.font = `${fontSize} ${fontFamily}`;
                    ctx.fillStyle = color;
                    ctx.textBaseline = 'middle';

                    // Measure the text width and calculate the X coordinate for centering
                    var textWidth1,textWidth2,textX1,textX2,textY1,textY2;
                    textWidth1 = ctx.measureText(line1).width;
                    textX1 = (width - textWidth1) / 2;

                    if(lines.length>1){
                        textWidth2 = ctx.measureText(line2).width;
                        textX2 = (width - textWidth2) / 2;
                        textY1 = height / 2 - (parseInt(fontSize, 10)*10);
                        textY2 = height /2 + (parseInt(fontSize, 10)*10);
                        ctx.fillText(line2, textX2, textY2);

                    }else{
                        textY1 =  height / 2;
                    }
                    ctx.fillText(line1, textX1, textY1);

                    // Draw the two lines of text

                    ctx.restore();
                }
            }
        }]
    });
}
