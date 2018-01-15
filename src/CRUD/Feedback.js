import React, { Component } from "react"
import {connect} from "react-redux"
import mapStateToProps from "./../mapStateToProps"

import Close from "./../Boilerplate/Close"
import LineBreak from "./../Boilerplate/LineBreak"
import Text from "./../Boilerplate/Text"
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
            let timer = Math.max(5000, feedback.message.length * 60)
            if (this.timeout != null) {
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.props.dispatch({type: "CLEAR_FEEDBACK"})
            }, timer)
        }
    }

    clearFeedback = () => {
        this.props.dispatch({type: "CLEAR_FEEDBACK"})
    }

    render = () => {
        if (!this.props.feedback || !this.props.feedback.message) {
            return null
        }
        let feedback = this.props.feedback || {}
        let color1 = (feedback.status === "error" ? "red" : feedback.status === "warning" ? "orange" : feedback.status === "success" ? "darkseagreen" : "royalblue")
        let color2 = feedback.status === "error" ? "rgb(255,235,235)" : feedback.status === "warning" ? "rgb(255,235,235)" : feedback.status === "success" ? "rgb(235,255,235)" : "rgb(240,245,255)"
        return (
            <View style={{userSelect: "none", position: "fixed", zIndex: 1000, width: "98%", textAlign: "center", margin: -4}}>
                <View style={{display: "inline-block", borderRadius: 5, padding: 10, background: color2, border: "1px solid " + color1, color: color1}}>
                    <View>
                        <View style={{display: "inline-block"}}>
                            {feedback.message.split("\n").map((line, index) => <Text key={index}>{line}{index < feedback.message.split("\n").length - 1 ? <LineBreak/> : null}</Text>)}
                        </View>
                        <Close onClick={this.clearFeedback} style={{float: "right", height: 15, width: 15, marginTop: -8, marginRight: -8, paddingBottom: 8}} />
                    </View>
                </View>
            </View>
        )
    }
}
export const Feedback = connect(mapStateToProps)(FeedbackContainer)

export default Feedback
