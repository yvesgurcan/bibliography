import React, { Component } from "react"

import View from "./../Boilerplate/View"

export class Close extends Component {

    render = () => (
        <View {...this.props} style={{cursor: "pointer", ...this.props.style}}> &times;</View>
    )
}

export default Close