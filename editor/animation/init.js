//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $, TableComponent) {


        function RadiationSearchCanvas(dataInput, dataExplanation) {
            var zx = 10;
            var zy = 10;
            var cellSize = 30;
            var cellN = dataInput.length;
            var fullSizeX = zx * 2 + cellSize * cellN;
            var fullSizeY = zy * 2 + cellSize * cellN;

            var colorDark = "#294270";
            var colorOrange = "#FABA00";
            var colorBlueArray = [
                "#8FC7ED",
                "#69B3E3",
                "#6BA3CF",
                "#0A82BD",
                "#0070AB"
                ];
            var colorWhite = "#FFFFFF";

            var attrRect = {"stroke": colorDark, "stroke-width": 1};
            var attrRectUnion = {"stroke": colorDark, "stroke-width": 1, "fill": colorOrange};
            var attrText = {"stroke": colorDark, "font-size": 16, "font-family": "Verdana"};

            this.createCanvas = function (dom) {
                this.paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);
                for (var i = 0; i < dataInput.length; i++) {
                    for (var j = 0; j < dataExplanation[i].length; j++) {
                        this.paper.rect(zx + j * cellSize, zy + i * cellSize,
                            cellSize, cellSize).attr(attrRect).attr("fill",
                                dataExplanation[i][j] ? colorOrange : colorBlueArray[dataInput[i][j] - 1]);
                        this.paper.text(zx + j * cellSize + cellSize / 2,
                            zy + i * cellSize + cellSize / 2,
                            String(dataInput[i][j])
                        ).attr(attrText);
                    }
                }
                return false;
            };
        }

        var io = new extIO({
            animation: function($expl, data){
                var checkioInput = data.in;
                var explanation = data.ext?data.ext["explanation"]:undefined;
                if (!checkioInput || !explanation) {
                    return;
                }
                var canvas = new RadiationSearchCanvas(checkioInput, explanation);
                canvas.createCanvas($content.find(".explanation")[0]);
            }
        });
        io.start();


    }
);
