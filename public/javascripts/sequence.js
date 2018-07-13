class Sequence {
    constructor(data, grid){
        // console.log(data, 'seq')
        this.data = data;
        this.grid = grid;
        this.sequence = data.note_table[5];
        this.num_table = data.num_table;
        this.sampler = new Tone.Sampler({
            "C2": "/sound/13c.wav",
            "C#2": "/sound/14.wav",
            "D2": "/sound/15.wav",
            "D#2": "/sound/16.wav",
            "E2": "/sound/17.wav",
            "F2": "/sound/18.wav",
            "F#2": "/sound/19.wav",
            "G2": "/sound/20.wav",
            "G#2": "/sound/21.wav",
            "A2": "/sound/22.wav",
            "A#2": "/sound/23.wav",
            "B2": "/sound/24.wav",
            "C3": "/sound/25c.wav",
            "C#3": "/sound/26.wav",
            "D3": "/sound/27.wav",
            "D#3": "/sound/28.wav",
            "E3": "/sound/29.wav",
            "F3": "/sound/30.wav",
            "F#3": "/sound/31.wav",
            "G3": "/sound/32.wav",
            "G#3": "/sound/33.wav",
            "A3": "/sound/34.wav",
            "A#3": "/sound/35.wav",
            "B3": "/sound/36.wav",
            "C4": "/sound/37c.wav",
            "C#4": "/sound/38.wav",
            "D4": "/sound/39.wav",
            "D#4": "/sound/40.wav",
            "E4": "/sound/41.wav",
            "F4": "/sound/42.wav",
            "F#4": "/sound/43.wav",
            "G4": "/sound/44.wav",
            "G#4": "/sound/45.wav",
            "A4": "/sound/46.wav",
            "A#4": "/sound/47.wav",
            "B4": "/sound/48.wav",
            "C5": "/sound/49c.wav",
            "C#5": "/sound/50.wav",
            "D5": "/sound/51.wav",
            "D#5": "/sound/52.wav",
            "E5": "/sound/53.wav",
            "F5": "/sound/54.wav",
            "F#5": "/sound/55.wav",
            "G5": "/sound/56.wav",
            "G#5": "/sound/57.wav",
            "A5": "/sound/58.wav",
            "A#5": "/sound/59.wav",
            "B5": "/sound/60.wav",
            "C6": "/sound/61c.wav",
            "C#6": "/sound/62.wav",
            "D6": "/sound/63.wav",
            "D#6": "/sound/64.wav"

        }, 
        this.playSequence(this.sequence, {loop: false})).toMaster();

        
    }
    playSequence(sequence, params){
        let cell = 0;
        let row = 5;
        let vector;
        let seq = new Tone.Sequence(
            //callback
            (time, note) => {
                vector = this.num_table[row][cell];
                this.sampler.triggerAttackRelease(note);
                cell++;
            }, 
            //notes
            [...this.sequence],
            //subdivision 
            '8n'
            );
            seq.loop = params.loop;
            seq.start();
            Tone.Transport.start();
    
    }
    stop(){
        Tone.Transport.cancel();
    }
}