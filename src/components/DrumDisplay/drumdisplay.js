import styles from './drumdisplay.module.css';
import React from 'react';


class DrumDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            powerOn: true, // Initial power state
      volume: 0.5, // Initial volume
      soundBank: 'Heater Kit', // Initial sound bank state
      soundBankOn: true

        }
        // Array of audio sources corresponding to each button
        this.soundBanks = {
            'Heater Kit': {
                Q: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
                    name: 'Heater-1',
                  },
                  W: {
                    url: 'https://stunneagle.com/projects/drum_machine/audio/drum-sticks-with-a-spank-twist.wav',
                    name: 'Drum Sticks',
                  },
                  E: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
                    name: 'Heater-3',
                  },
                  A: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
                    name: 'Heater-4',
                  },
                  S: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
                    name: 'Heater-6',
                  },
                  D: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
                    name: 'Disco-Oh',
                  },
                  Z: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
                    name: 'Kick n Hat',
                  },
                  X: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
                    name: 'Kick-1',
                  },
                  C: {
                    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
                    name: 'Cev',
                  },
            },

                'Bazz': {
                    Q: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
                        name: 'Heater-3',
                      },
                      W: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
                        name: 'Hot Drum',
                      },
                      E: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
                        name: 'Heater-8',
                      },
                      A: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
                        name: 'Heater-0',
                      },
                      S: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
                        name: 'Real Heater',
                      },
                      D: {
                        url:  'https://stunneagle.com/projects/drum_machine/audio/drum-sticks-with-a-spank-twist.wav',
                        name: 'Disco-New',
                      },
                      Z: {
                        url:  'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
                        name: 'Hit Beat',
                      },
                      X: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
                        name: 'Kick-Royal',
                      },
                      C: {
                        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
                        name: 'Klein',
                      },
                }
            
          };
          
    }
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyPress)
    }
    handleKeyPress = (event) => {
        const keyPressed = event.key.toUpperCase();

        //check if pressed key corresponds to one of the array
        if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(keyPressed)){
            this.handleButtonClick(keyPressed);
        }
    }
    // Function to handle button clicks
  handleButtonClick = (id) => {
    if (this.state.powerOn === true) {
      const audioElement = document.getElementById(id);
      // Get the URL and name based on the current sound bank
      const { url, name } = this.soundBanks[this.state.soundBank][id];

      audioElement.volume = this.state.volume;
      audioElement.src = url;
      audioElement.currentTime = 0;
      audioElement.play();
      document.getElementById('display').innerText = id + ' - ' + name;
    //   this.soundBanks[id].name
      document.getElementById('displaySoundBank').innerText = this.state.soundBank;
      
    }
  };
  // Function to handle Power Switch
  handlePowerSwitch = () => {
    this.setState((prevState) => ({
        powerOn: !prevState.powerOn,
    }));
    if(this.state.powerOn){
        document.getElementById('display').innerHTML = 'Power Off';
    document.getElementById('displaySoundBank').innerHTML = 'See You!';
    } else {
        document.getElementById('display').innerHTML = 'Power On';
    document.getElementById('displaySoundBank').innerHTML = 'Choose a sound Bank';
    }
  };

  //Function to handle volume change
  handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    this.setState({ volume: newVolume });
  }

  //Function to handle sound Bank change
  handleSoundBankSwitch = () => {
    this.setState((prevState) => ({
      soundBank: prevState.soundBank === 'Heater Kit' ? 'Bazz' : 'Heater Kit',
      soundBankOn: !prevState.soundBankOn,
    }));
  }
  
    render(){
        return(
            <div className={styles["container"]}>
    <div className={styles["keys"]}>
        {['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map((key) => (
            <button 
            key={key}
            className={styles["drum-pad"]}
            id={key + 'Audio'}
            onClick={()=> this.handleButtonClick(key)} >
                {key}
                <audio 
                className={styles["audio-element"]}
                id={key}
                // src={this.soundBanks[key].url}
                ></audio>

            </button>
        ))}
       
    </div>
    <div className={styles["settings"]}>
        
        <div className={styles["power"]} >
            <p>Power</p>
                <div className={styles["button-display"]} onClick={this.handlePowerSwitch}>
                    <div className={`${styles["button-switch"]} ${this.state.powerOn ? styles['on'] : ''}`} id="switch1"></div>
                </div> 
        </div>
        <div className={`${styles["display"]} ${this.state.powerOn ? styles['switched-on'] : ''}`} >
            <p id="display">Power On!</p>
            <p id="displaySoundBank">{this.state.soundBank === 'Heater Kit'? 'Heater Kit' : 'Bazz'}</p>

        </div>
        <div className={styles["volume"]}>
            
            <div className={styles["volume"]}>
                <p>Volume</p>
                <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value={this.state.volume}
              onChange={this.handleVolumeChange} />
            </div>
            
        </div>
        <div className={styles["sound-bank"]}>
            <p>Sound Bank</p>
            <div className={styles['button-display']} onClick={this.handleSoundBankSwitch}>
              <div
                className={`${styles['button-switch']} ${this.state.soundBankOn ? styles['on'] : ''}`}
                id="switch2"
              ></div>
            </div>
        </div>
        <h4>Drum machine by stunneagle</h4>
    </div>

</div>
        );
    }
}

export default DrumDisplay