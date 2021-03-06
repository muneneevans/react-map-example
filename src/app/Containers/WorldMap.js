import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "./kenya"
class WorldMap extends Component {
    constructor() {
        super();
        this.state = {
            featureCollection: {},
            worldData: []
        }
    }

    projection(data) {
        // return geoMercator()
        //     .scale(900)
        //     .translate([800 / 4, 450 / 2])
        let height = 1000;
        let width = 1000;
        // Create a unit projection.
        var projection = geoMercator()
            .scale(1)
            .translate([0, 0]);

        // Create a path generator.
        var path = geoPath()
            .projection(projection);

        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(data),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.
        return projection
            .scale(s)
            .translate(t);
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

        let featureCollection = feature(worldData, worldData.objects.kenya);
        this.setState({
            featureCollection: featureCollection,
            worldData: featureCollection.features
        })
    }

    render() {
        let p = this.projection(this.state.featureCollection);
        return (
            <svg style={{height: "auto", width: "auto", maxHeight:"100%", maxWidth: "100%"}} viewBox="0 0 1000 1000">
                <g className="countries">
                    {
                        this.state.worldData.map((d, i) => (
                            <path
                                key={`path-${i}`}
                                d={geoPath().projection(p)(d)}
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
                        cx={p([8, 48])[0]}
                        cy={p([8, 48])[1]}
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
