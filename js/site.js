var ScaleType;
(function (ScaleType) {
    ScaleType[ScaleType["Major"] = 0] = "Major";
    ScaleType[ScaleType["HarmonicMajor"] = 1] = "HarmonicMajor";
    ScaleType[ScaleType["DoubleHarmonicMajor"] = 2] = "DoubleHarmonicMajor";
    ScaleType[ScaleType["HarmonicMinor"] = 3] = "HarmonicMinor";
    ScaleType[ScaleType["MelodicMinor"] = 4] = "MelodicMinor";
})(ScaleType || (ScaleType = {}));
function createModes(tonicInput, scaleTypeInput, isParallelVisible, isSharpsVisible, isNumeralsVisible, isOctaveVisible, isIntervalsVisible) {
    var chrom;
    var scaleName;
    var modeNames;
    var scaleChords;
    var scaleIntervals;
    var tonic = parseInt(tonicInput, 10);
    var scaleType = parseInt(scaleTypeInput, 10);
    switch (scaleType) {
        case ScaleType.Major:
            scaleName = "Major";
            modeNames = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
            scaleChords = ["Maj", "Min", "Min", "Maj", "Maj", "Min", "Dim"];
            scaleIntervals = [2, 2, 1, 2, 2, 2, 1];
            break;
        case ScaleType.HarmonicMajor:
            scaleName = "Harmonic Major";
            modeNames = ["Ionian &#x266D;6", "Dorian &#x266D;5", "Phrygian &#x266D;4", "Lydian &#x266D;3", "Mixolydian &#x266D;2", "Lydian Augmented &#x266F;2", "Locrian &#x266D;&#x266D;7"];
            scaleChords = ["Maj", "Dim", "Min", "Min", "Maj", "Aug", "Dim"];
            scaleIntervals = [2, 2, 1, 2, 1, 3, 1];
            break;
        case ScaleType.DoubleHarmonicMajor:
            scaleName = "Double Harmonic Major";
            modeNames = ["Ionian &#x266D;2 &#x266D;6", "Lydian &#x266F;2 &#x266F;6", "Ultraphrygian", "Hungarian", "Oriental", "Ionian Augmented &#x266F;2", "Locrian &#x266D;&#x266D;3 &#x266D;&#x266D;7"];
            scaleChords = ["Maj", "Maj", "Min", "Min", "Maj(&#x266D;5)", "Aug", "Sus2(&#x266D;5)"];
            scaleIntervals = [1, 3, 1, 2, 1, 3, 1];
            break;
        case ScaleType.HarmonicMinor:
            scaleName = "Harmonic Minor";
            modeNames = ["Aeolian Natural 7", "Locrian Natural 6", "Ionian Augmented", "Dorian &#x266F;4", "Phrygian Dominant", "Lydian &#x266F;2", "Super Locrian &#x266D;&#x266D;7"];
            scaleChords = ["Min", "Dim", "Aug", "Min", "Maj", "Maj", "Dim"];
            scaleIntervals = [2, 1, 2, 2, 1, 3, 1];
            break;
        case ScaleType.MelodicMinor:
            scaleName = "Harmonic Minor";
            modeNames = ["Ionian Minor", "Dorian &#x266D;2", "Lydian Augmented", "Lydian Dominant", "Mixolydian &#x266D;6", "Aeolian Diminished", "Super Locrian"];
            scaleChords = ["Min", "Min", "Aug", "Maj", "Maj", "Dim", "Dim"];
            scaleIntervals = [2, 1, 2, 2, 2, 2, 1];
    }
    if (isSharpsVisible) {
        chrom = ["A", "A&#x266F;", "B", "C", "C&#x266F;", "D", "D&#x266F;", "E", "F", "F&#x266F;", "G", "G&#x266F;"];
    }
    else {
        chrom = ["A", "B&#x266D;", "B", "C", "D&#x266D;", "D", "E&#x266D;", "E", "F", "G&#x266D;", "G", "A&#x266D;"];
    }
    var modeOne = new Mode(1, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeTwo = new Mode(2, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeThree = new Mode(3, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeFour = new Mode(4, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeFive = new Mode(5, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeSix = new Mode(6, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeSeven = new Mode(7, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    var modeObjs = [modeOne, modeTwo, modeThree, modeFour, modeFive, modeSix, modeSeven];
    document.getElementById("modes").innerHTML =
        outputTitle(chrom, tonic, scaleName, isParallelVisible) +
            outputAllModes(modeObjs, isOctaveVisible, isNumeralsVisible, isIntervalsVisible);
    document.getElementById("print").innerHTML = outputPrintButton();
}
function outputTitle(chrom, tonic, scaleName, isParallelVisible) {
    var modeMethod;
    if (isParallelVisible) {
        modeMethod = "Parallel";
    }
    else {
        modeMethod = "Relative";
    }
    var codeBlock = '<div class="title text-center">' +
        '<h3 class=""> The ' + modeMethod + ' Modes of ' + chrom[tonic] + ' ' + scaleName + '</h3>' +
        '</div>';
    return codeBlock;
}
function outputAllModes(modeObjs, isOctaveVisible, isNumeralsVisible, isIntervalsVisible) {
    var codeBlock = "";
    for (var i = 1; i < 8; i++) {
        codeBlock += outputSingleMode(modeObjs[i - 1], isOctaveVisible, isNumeralsVisible, isIntervalsVisible);
    }
    return codeBlock;
}
function outputSingleMode(mode, isOctaveVisible, isNumeralsVisible, isIntervalsVisible) {
    var degrees;
    var intervals;
    if (isNumeralsVisible) {
        degrees = outputDegreesNumerals(mode, isOctaveVisible);
    }
    else {
        degrees = outputDegrees(mode, isOctaveVisible);
    }
    if (isIntervalsVisible) {
        intervals = outputIntervals(mode);
    }
    else {
        intervals = "";
    }
    var codeBlock = '<div class="single-mode">' +
        '<div class="row">' +
        '<div class="name"><h5>' + mode.name + '</h5><h6 class="text-muted"><i>' + mode.subtitle + '</i></h6></div>' + degrees +
        '</div>' +
        '<div class="row">' +
        '<div class="collapse-interval-ninth"></div>' +
        '<div class="outer-buffer"></div>' +
        '<div class="inner-buffer"></div>' +
        intervals +
        '<div class="inner-buffer"></div>' +
        '<div class="outer-buffer"></div>' +
        '</div>' +
        '</div>';
    return codeBlock;
}
function outputDegreesNumerals(mode, isOctabeVisible) {
    var codeBlock = "";
    var diff = "";
    for (var i = 0; i < 7; i++) {
        if (mode.hasDifferentDegrees[i]) {
            diff = "text-warning";
        }
        else {
            diff = "text-muted";
        }
        codeBlock += '<div class="degree text-center">' +
            '<h4 class="' + diff + '">' + mode.romanNumerals[i] + '</h4>' +
            '<h2>' + mode.notes[i] + '</h2>' +
            '</div>';
    }
    if (isOctabeVisible) {
        if (mode.hasDifferentDegrees[0]) {
            diff = "text-warning";
        }
        else {
            diff = "text-muted";
        }
        codeBlock += '<div class="degree text-center">' +
            '<h4 class="' + diff + '">' + mode.romanNumerals[0] + '</h4>' +
            '<h2>' + mode.notes[0] + '</h2>' +
            '</div>';
    }
    else {
        codeBlock += '<div class="degree text-center">' +
            '<h4></h4>' +
            '<h2></h2>' +
            '</div>';
    }
    return codeBlock;
}
function outputDegrees(mode, isOctaveVisible) {
    var codeBlock = "";
    var diff = "";
    for (var i = 0; i < 7; i++) {
        if (mode.hasDifferentDegrees[i]) {
            diff = "text-warning";
        }
        else {
            diff = "text-muted";
        }
        codeBlock += '<div class="degree text-center">' +
            '<h6 class="text-muted text-uppercase">' + mode.chords[i] + '</h6>' +
            '<h2>' + mode.notes[i] + '</h2>' +
            '<h5 class="' + diff + '">' + mode.degrees[i] + '</h5>' +
            '</div>';
    }
    if (isOctaveVisible) {
        if (mode.hasDifferentDegrees[i]) {
            diff = "tex-warning";
        }
        else {
            diff = "text-muted";
        }
        codeBlock += '<div class="degree text-center">' +
            '<h6 class="text-muted text-uppercase">' + mode.chords[0] + '</h6>' +
            '<h2>' + mode.notes[0] + '</h2>' +
            '<h5 class="' + diff + '">' + '8' + '</h5>' +
            '</div>';
    }
    else {
        codeBlock += '<div class="degree text-center">' +
            '<h6></h6>' +
            '<h2></h2>' +
            '<h5></h5>' +
            '</div>';
    }
    return codeBlock;
}
function outputIntervals(mode) {
    var codeBlock = '<div class="interval text-center">' +
        '<h6>' + mode.semitones[0] + '</h6>' +
        '</div >';
    for (var i = 1; i < 7; i++) {
        codeBlock += '<div class="interval text-center"><h6>⁠—</h6></div>' +
            '<div class="interval text-center">' +
            '<h6>' + mode.semitones[i] + '</h6>' +
            '</div >';
    }
    return codeBlock;
}
function printContent() {
    var restorePage = document.body.innerHTML;
    var printContent = '<div class="container">' +
        document.getElementById("modes").innerHTML +
        '</div>';
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = restorePage;
}
function outputPrintButton() {
    var codeBlock = '<button type="button" class="btn btn-secondary" onclick="printContent()">Print These Modes</button>';
    return codeBlock;
}
//# sourceMappingURL=site.js.map