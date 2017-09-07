import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "./kenya"
class WorldMap extends Component {
    constructor() {
        super();
        this.state = {
            worldData: []
        }
    }

    projection() {
        return geoMercator()
            .scale(900)
            .translate([800 / 4, 450 / 2])
    }


    componentDidMount() {
        // fetch('http://localhost:8000/maps/api/countries/1/plain')
        // fetch('http://localhost:8000/maps/api/countries/kenya/county')
        //     .then(response => {
        //         if (response.status != 200) {
        //             console.log('there was an error fetching the data: ' + response.status);
        //             return;
        //         }
        //         // console.log(response.json());
        //         response.json().then(worldData => {
        //             console.log(worldData)
        //             this.setState({
        //                 worldData: feature(worldData, worldData.objects.kenya2).features
        //             })
        //         })
        //     })
        
        this.setState({
            worldData: feature(worldData, worldData.objects.kenya).features
        })
    }

    render() {
        console.log(this.state.worldData)
        return (
            <svg width={800} height={450} viewBox="0 0 1000 450">
                <g className="countries">
                    {
                        this.state.worldData.map((d, i) => (
                            <path
                                key={`path-${i}`}
                                d={geoPath().projection(this.projection())(d)}
                                className="country"
                                fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
                                stroke="#FFFFFF"
                                strokeWidth={0.5}
                            />
                        ))
                    }
                </g>
                <g className="markers">
                    <circle
                        cx={this.projection()([8, 48])[0]}
                        cy={this.projection()([8, 48])[1]}
                        r={10}
                        fill="#E91E63"
                        className="marker"
                    />
                </g>
            </svg>

        );
    }
}

export default WorldMap
