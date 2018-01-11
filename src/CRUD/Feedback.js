import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"


import View from "./../Boilerplate/View"

export class FeedbackContainer extends Component {

    componentDidMount = () => {
        this.timeout = null
    }

    componentWillUnmount = () => {
        clearTimeout(this.timeout)
    }

    componentDidUpdate = () => {
        let feedback = this.props.feedback || {}
        if (feedback.message !== undefined) {
            let timer = Math.max(5000, feedback.message.length * 100)
            if (this.timeout != null) {
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.props.dispatch({type: "CLEAR_FEEDBACK"})
            }, timer)
        }
    }

    render = () => {
        if (!this.props.feedback) {
            return null
        }
        let feedback = this.props.feedback || {}
        let color1 = (feedback.status === "error" ? "red" : feedback.status === "warning" ? "orange" : feedback.status === "success" ? "darkseagreen" : "lightblue")
        let color2 = feedback.status === "error" ? "rgb(255,235,235)" : feedback.status === "warning" ? "rgb(255,235,235)" : feedback.status === "success" ? "rgb(235,255,235)" : "rgb(240,245,255)"
        return (
            <View style={{position: "fixed", zIndex: 1000, width: "100%", textAlign: "center"}}>
                <View style={{display: "inline-block", borderRadius: 5, padding: 10, background: color2, border: "1px solid " + color1, color: color1}}>
                    {feedback.message}
                </View>
            </View>
        )
    }
}
export const Feedback = connect(mapStateToProps)(FeedbackContainer)

export default Feedback
