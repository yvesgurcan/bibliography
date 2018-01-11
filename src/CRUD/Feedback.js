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
        return (
            <View style={{borderRadius: 5, padding: 5, background: (feedback.status === "error" ? "rgb(255,235,235)" : feedback.status === "warning" ? "rgb(255,235,235)" : feedback.status === "success" ? "rgb(235,255,235)" : "rgb(240,245,255)"), border: "1px solid " + (feedback.status === "error" ? "red" : feedback.status === "warning" ? "orange" : feedback.status === "success" ? "darkseagreen" : "lightblue")}}>
                {feedback.message}
            </View>
        )
    }
}
export const Feedback = connect(mapStateToProps)(FeedbackContainer)

export default Feedback