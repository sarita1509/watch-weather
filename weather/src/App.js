import React, { Component, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Input from "./components/Input";
import SearchResults from "./components/SearchResults";
import SetUnits from "./components/SetUnits";
import WeatherReport from "./components/WeatherReport";

class App extends Component {
    
    state = {
        SearchResults: [],
        error: false,
        isLoding: true,
        selectedLocId: 0,
        tempUnits: "C",
        weatherData: {} 
      }
      
      searchRef = useRef();
      
   componentDidMount() {
        this.searchRef.current.focus();
        this.getWeather();
   }
   componentDidUpdate(_, prevState) {
    if (

        prevState.selectedLocId !== this.state.selectedLocId ||
        prevState.tempUnits !== this.state.tempUnits
    ){
        this.getWeather(this.state.selectedLocId);
   }
   }

  searchLocations = debounce(KeyWord => {
    fetch (`https://api.weatherserver.com/weather/cities/${KeyWord}`)
    .then(res => res.json())
    .then(({results}) => this.setState({SearchResults: results, error: false}))
    .catch(() => this.setState({error: true}))
  },200)
  getWeather = () => {
    this.setState({
        SearchResults: [],
        isLoding: true,
        error: false,
    });
    this.searchRef.current.value = "";

    fetch(`https://api.weatherserver.com/weather/current/${this.state.selectedLocId}/${this.state.tempUnits}`)
  .then(res => res.json())
  .then(results => this.setState({
    weatherData: results,
    isLoding: false,
  }))
  .catch(() => this.setState({error: true}))
   
}
render(){
    return (
        <div className="weather-app">
        <h1>WeatheWatch</h1>
        <Input label="LOCATION" onInput={e => this.searchLocations(e.target.value)} inputRef={this.searchRef}/>
        {this.state.SearchResults.length > 0 && (
            <SearchResults
            data={this.state.searchResults}
            selectLocation={cityId => this.setState({
                setectedLocId: cityId
            })}/>
            )}

        <SetUnits
       value={this.state.tempUnits}
       onSet={e=> this.setState({tempUnits: e.target.value })}
        />
       
       {this.state.isLoding ? (<div className="id-Loading"/>) : (
        <WeatherReport
            weatherData = {this.state.weatherData}
           Units = {this.state.tempUnits}/>
       )}

      {this.state.error ? <div className="error-panel" />  : null }
          
      </div>
    );
  }
}
export default App;