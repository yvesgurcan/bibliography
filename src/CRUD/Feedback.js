import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"


import View from "./../Boilerplate/View"

export class FeedbackContainer extends Component {
    render = () => {
        if (!this.props.feedback) {
            return null
        }
        let feedback = this.props.feedback || {}
        let color1 = (feedback.status === "error" ? "red" : feedback.status === "warning" ? "orange" : feedback.status === "success" ? "darkseagreen" : "lightblue")
        let color2 = feedback.status === "error" ? "rgb(255,235,235)" : feedback.status === "warning" ? "rgb(255,235,235)" : feedback.status === "success" ? "rgb(235,255,235)" : "rgb(240,245,255)"
        return (
            <View style={{borderRadius: 5, padding: 5, background: color2, border: "1px solid " + color1, color: color1}}>
                {feedback.message}
            </View>
        )
    }
}
export const Feedback = connect(mapStateToProps)(FeedbackContainer)

export default Feedback