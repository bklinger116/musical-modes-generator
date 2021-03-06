var Mode = (function () {
    function Mode(modeNum, chrom, tonic, scaleType, scaleName, isParallelVisible, scaleIntervals, scaleChords, modeNames) {
        this.modeNum = 1;
        this.name = "";
        this.subtitle = "";
        this.notes = ["", "", "", "", "", "", ""];
        this.chords = ["", "", "", "", "", "", ""];
        this.alterations = ["", "", "", "", "", "", ""];
        this.degrees = ["1", "2", "3", "4", "5", "6", "7"];
        this.hasDifferentDegrees = [false, false, false, false, false, false, false];
        this.romanNumerals = ["", "", "", "", "", "", ""];
        this.intervals = [0, 0, 0, 0, 0, 0, 0];
        this.semitones = ["", "", "", "", "", "", ""];
        this.modeNum = modeNum;
        this.setModeNum(modeNum);
        this.setName(modeNum, modeNames);
        this.setSubtitle(modeNum, scaleType, scaleName);
        this.setIntervals(modeNum, scaleIntervals);
        this.setSemitones(this.intervals);
        if (isParallelVisible) {
            this.setNotesParallel(chrom, tonic, this.intervals);
        }
        else {
            this.setNotesRelative(modeNum, chrom, tonic, scaleIntervals);
        }
        this.setChords(modeNum, scaleChords);
        this.setAlterations(modeNum, scaleType);
        this.setDegrees(this.alterations);
        this.setHasDifferentDegrees(this.alterations);
        this.setRomanNumerals(this.alterations);
    }
    Mode.prototype.setModeNum = function (modeNum) {
        this.modeNum = modeNum;
    };
    Mode.prototype.setName = function (modeNum, names) {
        this.name = names[modeNum - 1];
    };
    Mode.prototype.setSubtitle = function (modeNum, scaleType, scaleName) {
        switch (modeNum) {
            case 1:
                this.subtitle = "1<sup>st</sup> Mode of " + scaleName + " (" + scaleName + " Scale)";
                break;
            case 2:
                this.subtitle = "2<sup>nd</sup> Mode of " + scaleName;
                break;
            case 3:
                this.subtitle = "3<sup>rd</sup> Mode of " + scaleName;
                break;
            default:
                this.subtitle = modeNum + "<sup>th</sup> Mode of " + scaleName;
        }
        if (modeNum == 6 && scaleType == ScaleType.Major) {
            this.subtitle += " (Minor Scale)";
        }
        else if (modeNum == 4 && scaleType == ScaleType.DoubleHarmonicMajor) {
            this.subtitle += " (Double Harmonic Minor Scale)";
        }
    };
    Mode.prototype.setNotesParallel = function (chrom, tonic, intervals) {
        var note = tonic;
        this.notes[0] = chrom[tonic];
        for (var i = 1; i < 7; i++) {
            note += intervals[i - 1];
            if (note > 11) {
                note -= 12;
            }
            this.notes[i] = chrom[note];
        }
    };
    Mode.prototype.setNotesRelative = function (modeNum, chrom, tonic, scaleIntervals) {
        var note = tonic;
        var notes = [chrom[tonic], "", "", "", "", "", ""];
        for (var i = 1; i < 7; i++) {
            note += scaleIntervals[i - 1];
            if (note > 11) {
                note -= 12;
            }
            notes[i] = chrom[note];
        }
        for (var i = 0; i < 7; i++) {
            note = i + modeNum - 1;
            if (note > 6) {
                note -= 7;
            }
            this.notes[i] = notes[note];
        }
    };
    Mode.prototype.setChords = function (modeNum, scaleChords) {
        var chord = modeNum - 1;
        this.chords[0] = scaleChords[chord];
        for (var i = 1; i < 7; i++) {
            chord++;
            if (chord > 6) {
                chord -= 7;
            }
            this.chords[i] = scaleChords[chord];
        }
    };
    Mode.prototype.setAlterations = function (modeNum, scaleType) {
        var flat = "&#x266D;";
        var sharp = "&#x266F;";
        switch (scaleType) {
            case ScaleType.Major:
                switch (modeNum) {
                    case 2:
                        this.alterations[2] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 3:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 4:
                        this.alterations[3] = sharp;
                        break;
                    case 5:
                        this.alterations[6] = flat;
                        break;
                    case 6:
                        this.alterations[2] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 7:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                }
                break;
            case ScaleType.HarmonicMajor:
                switch (modeNum) {
                    case 1:
                        this.alterations[5] = flat;
                        break;
                    case 2:
                        this.alterations[2] = flat;
                        this.alterations[4] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 3:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[3] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 4:
                        this.alterations[2] = flat;
                        this.alterations[3] = sharp;
                        break;
                    case 5:
                        this.alterations[1] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 6:
                        this.alterations[1] = sharp;
                        this.alterations[3] = sharp;
                        this.alterations[4] = sharp;
                        break;
                    case 7:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[3] = flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat + flat;
                }
                break;
            case ScaleType.DoubleHarmonicMajor:
                switch (modeNum) {
                    case 1:
                        this.alterations[1] = flat;
                        this.alterations[5] = flat;
                        break;
                    case 2:
                        this.alterations[1] = sharp;
                        this.alterations[3] = sharp;
                        this.alterations[5] = sharp;
                        break;
                    case 3:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[3] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat + flat;
                        break;
                    case 4:
                        this.alterations[2] = flat;
                        this.alterations[3] = sharp;
                        this.alterations[5] = flat;
                        break;
                    case 5:
                        this.alterations[1] = flat;
                        this.alterations[4] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 6:
                        this.alterations[1] = sharp;
                        this.alterations[4] = sharp;
                        break;
                    case 7:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat + flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat + flat;
                }
                break;
            case ScaleType.HarmonicMinor:
                switch (modeNum) {
                    case 1:
                        this.alterations[2] = flat;
                        this.alterations[5] = flat;
                        break;
                    case 2:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[4] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 3:
                        this.alterations[4] = sharp;
                        break;
                    case 4:
                        this.alterations[2] = flat;
                        this.alterations[3] = sharp;
                        this.alterations[6] = flat;
                        break;
                    case 5:
                        this.alterations[1] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 6:
                        this.alterations[1] = sharp;
                        this.alterations[3] = sharp;
                        break;
                    case 7:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[3] = flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat + flat;
                }
                break;
            case ScaleType.MelodicMinor:
                switch (modeNum) {
                    case 1:
                        this.alterations[2] = flat;
                        break;
                    case 2:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 3:
                        this.alterations[3] = sharp;
                        this.alterations[4] = sharp;
                        break;
                    case 4:
                        this.alterations[3] = sharp;
                        this.alterations[6] = flat;
                        break;
                    case 5:
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 6:
                        this.alterations[2] = flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                        break;
                    case 7:
                        this.alterations[1] = flat;
                        this.alterations[2] = flat;
                        this.alterations[3] = flat;
                        this.alterations[4] = flat;
                        this.alterations[5] = flat;
                        this.alterations[6] = flat;
                }
        }
    };
    Mode.prototype.setDegrees = function (alterations) {
        for (var i = 0; i < 7; i++) {
            this.degrees[i] = alterations[i] + this.degrees[i];
        }
    };
    Mode.prototype.setHasDifferentDegrees = function (alterations) {
        for (var i = 0; i < 7; i++) {
            if (alterations[i] != "") {
                this.hasDifferentDegrees[i] = true;
            }
        }
    };
    Mode.prototype.setRomanNumerals = function (alterations) {
        var numeralMaj = ["I", "II", "III", "IV", "V", "VI", "VII"];
        var numeralMin = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
        var numeralAug = ["I<sup>+</sup>", "II<sup>+</sup>", "III<sup>+</sup>", "IV<sup>+</sup>", "V<sup>+</sup>", "VI<sup>+</sup>", "VII<sup>+</sup>"];
        var numeralDim = ["i<sup>o</sup>", "ii<sup>o</sup>", "iii<sup>o</sup>", "iv<sup>o</sup>", "v<sup>o</sup>", "vi<sup>o</sup>", "vii<sup>o</sup>"];
        var numeralMajFlatFive = ["I<sup>(&#x266D;5)</sup>", "II<sup>(&#x266D;5)</sup>", "III<sup>(&#x266D;5)</sup>", "IV<sup>(&#x266D;5)</sup>", "V<sup>(&#x266D;5)</sup>", "VI<sup>(&#x266D;5)</sup>", "VII<sup>(&#x266D;5)</sup>"];
        var numeralSusTwoFlatFive = ["III<sup>7</sup>", "IV<sup>7</sup>", "V<sup>7</sup>", "VI<sup>7</sup>", "VII<sup>7</sup>", "I<sup>7</sup>", "II<sup>7</sup>"];
        for (var i = 0; i < 7; i++) {
            switch (this.chords[i]) {
                case "Maj":
                    this.romanNumerals[i] = numeralMaj[i];
                    break;
                case "Min":
                    this.romanNumerals[i] = numeralMin[i];
                    break;
                case "Aug":
                    this.romanNumerals[i] = numeralAug[i];
                    break;
                case "Dim":
                    this.romanNumerals[i] = numeralDim[i];
                    break;
                case "Maj(&#x266D;5)":
                    this.romanNumerals[i] = numeralMajFlatFive[i];
                    break;
                case "Sus2(&#x266D;5)":
                    this.romanNumerals[i] = numeralSusTwoFlatFive[i];
            }
            this.romanNumerals[i] = alterations[i] + this.romanNumerals[i];
        }
    };
    Mode.prototype.setIntervals = function (modeNum, scaleIntervals) {
        var interval = modeNum - 1;
        this.intervals[0] = scaleIntervals[interval];
        for (var i = 1; i < 7; i++) {
            interval++;
            if (interval > 6)
                interval -= 7;
            this.intervals[i] = scaleIntervals[interval];
        }
    };
    Mode.prototype.setSemitones = function (intervals) {
        for (var i = 0; i < 7; i++) {
            if (intervals[i] == 1) {
                this.semitones[i] = "H";
            }
            else if (intervals[i] == 2) {
                this.semitones[i] = "W";
            }
            else {
                this.semitones[i] = "W+H";
            }
        }
    };
    return Mode;
}());
//# sourceMappingURL=mode.js.map