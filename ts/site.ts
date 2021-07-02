enum ScaleType { Major, HarmonicMajor, DoubleHarmonicMajor, HarmonicMinor, MelodicMinor }

function createModes(tonicInput: string, scaleTypeInput: string, isParallelVisible: boolean, isSharpsVisible: boolean, isNumeralsVisible: boolean, isOctaveVisible: boolean, isIntervalsVisible: boolean) {
    let chrom: string[];
    let scaleName: string;
    let modeNames: string[];
    let scaleChords: string[];
    let scaleIntervals: number[];

    let tonic: number = parseInt(tonicInput, 10);
    let scaleType: number = parseInt(scaleTypeInput, 10);

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
            scaleName = "Melodic Minor";
            modeNames = ["Ionian Minor", "Dorian &#x266D;2", "Lydian Augmented", "Lydian Dominant", "Mixolydian &#x266D;6", "Aeolian Diminished", "Super Locrian"];
            scaleChords = ["Min", "Min", "Aug", "Maj", "Maj", "Dim", "Dim"];
            scaleIntervals = [2, 1, 2, 2, 2, 2, 1];
    }

    if (isSharpsVisible) {
        chrom = ["A", "A&#x266F;", "B", "C", "C&#x266F;", "D", "D&#x266F;", "E", "F", "F&#x266F;", "G", "G&#x266F;"];
    } else {
        chrom = ["A", "B&#x266D;", "B", "C", "D&#x266D;", "D", "E&#x266D;", "E", "F", "G&#x266D;", "G", "A&#x266D;"];
    }

    let modeOne = new Mode(1, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeTwo = new Mode(2, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeThree = new Mode(3, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeFour = new Mode(4, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeFive = new Mode(5, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeSix = new Mode(6, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);
    let modeSeven = new Mode(7, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames);

    let modeObjs: Mode[] = [modeOne, modeTwo, modeThree, modeFour, modeFive, modeSix, modeSeven];

    document.getElementById("modes").innerHTML =
        outputTitle(chrom, tonic, scaleName, isParallelVisible) +
        outputAllModes(modeObjs, isOctaveVisible, isNumeralsVisible, isIntervalsVisible);

    document.getElementById("print").innerHTML = outputPrintButton();
}

function outputTitle(chrom: string[], tonic: number, scaleName: string, isParallelVisible: boolean) {
    let modeMethod: string;

    if (isParallelVisible) {
        modeMethod = "Parallel";
    } else {
        modeMethod = "Relative";
    }

    let codeBlock: string = '<div class="title text-center">' +
        '<h3 class=""> The ' + modeMethod + ' Modes of ' + chrom[tonic] + ' ' + scaleName + '</h3>' +
        '</div>';

    return codeBlock;
}

function outputAllModes(modeObjs: Mode[], isOctaveVisible: boolean, isNumeralsVisible: boolean, isIntervalsVisible: boolean) {
    let codeBlock: string = "";

    for (var i = 1; i < 8; i++) {
        codeBlock += outputSingleMode(modeObjs[i - 1], isOctaveVisible, isNumeralsVisible, isIntervalsVisible);
    }

    return codeBlock;
}

function outputSingleMode(mode: Mode, isOctaveVisible: boolean, isNumeralsVisible: boolean, isIntervalsVisible: boolean) {
    var degrees;
    var intervals;

    if (isNumeralsVisible) {
        degrees = outputDegreesNumerals(mode, isOctaveVisible);
    } else {
        degrees = outputDegrees(mode, isOctaveVisible);
    }

    if (isIntervalsVisible) {
        intervals = outputIntervals(mode);
    } else {
        intervals = "";
    }

    let codeBlock: string = '<div class="single-mode">' +
        '<div class="row">' +           // Begin row one
        '<div class="name"><h5>' + mode.name + '</h5><h6 class="text-muted"><i>' + mode.subtitle + '</i></h6></div>' + degrees +
        '</div>' +                      // End row one
        '<div class="row">' +           // Begin row two
        '<div class="collapse-interval-ninth"></div>' +
        '<div class="outer-buffer"></div>' +
        '<div class="inner-buffer"></div>' +
        intervals +
        '<div class="inner-buffer"></div>' +
        '<div class="outer-buffer"></div>' +
        '</div>' +                        // End row two
        '</div>';

    return codeBlock;
}

function outputDegreesNumerals(mode: Mode, isOctabeVisible: boolean) {
    let codeBlock: string = "";
    let diff: string = "";

    for (var i = 0; i < 7; i++) {
        if (mode.hasDifferentDegrees[i]) {
            diff = "text-warning";
        } else {
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
        } else {
            diff = "text-muted";
        }

        codeBlock += '<div class="degree text-center">' +
            '<h4 class="' + diff + '">' + mode.romanNumerals[0] + '</h4>' +
            '<h2>' + mode.notes[0] + '</h2>' +
            '</div>';
    } else {
        codeBlock += '<div class="degree text-center">' +
            '<h4></h4>' +
            '<h2></h2>' +
            '</div>';
    }

    return codeBlock;
}

function outputDegrees(mode: Mode, isOctaveVisible: boolean) {
    let codeBlock: string = "";
    let diff: string = "";

    for (var i = 0; i < 7; i++) {
        if (mode.hasDifferentDegrees[i]) {
            diff = "text-warning";
        } else {
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
        } else {
            diff = "text-muted";
        }

        codeBlock += '<div class="degree text-center">' +
            '<h6 class="text-muted text-uppercase">' + mode.chords[0] + '</h6>' +
            '<h2>' + mode.notes[0] + '</h2>' +
            '<h5 class="' + diff + '">' + '8' + '</h5>' +
            '</div>';
    } else {
        codeBlock += '<div class="degree text-center">' +
            '<h6></h6>' +
            '<h2></h2>' +
            '<h5></h5>' +
            '</div>';
    }

    return codeBlock;
}

function outputIntervals(mode: Mode) {
    let codeBlock: string = '<div class="interval text-center">' +
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
    let restorePage: string = document.body.innerHTML;
    let printContent: string = '<div class="container">' +
        document.getElementById("modes").innerHTML +
        '</div>';

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = restorePage;
}

function outputPrintButton() {
    let codeBlock: string = '<button type="button" class="btn btn-secondary" onclick="printContent()">Print These Modes</button>';

    return codeBlock;
}
