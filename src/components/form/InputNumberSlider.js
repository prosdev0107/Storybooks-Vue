import React from 'react'
import InputSlider from 'react-input-slider'
import "../../styles/theme/react-input-slider.min.css"

// https://wangzuo.github.io/react-input-slider/

class InputNumberSlider extends React.Component {

    state = {
        number: 0
    }

    handleChange = (number) => {
        this.setState({ number: number.x })
        this.props.input.onChange({
            target: {
                name: this.props.input.name,
                value: number.x
            }
        })
    }

    componentWillMount(){

        let { defaultValue, forceValue } = this.props
        this.setState({ number: forceValue || (defaultValue || 0) })
    }

    componentWillReceiveProps(nextProps){

        let { defaultValue, forceValue } = nextProps
        this.setState({ number: forceValue || (defaultValue || 0) })
    }

    render() {

        return (
            <div className="input-number-container">

                <input
                    {...this.props.input}
                    className="hidden"
                    type="number"
                    value={this.state.number}
                />

                <div className={this.props.hideValue ? "hidden" : ""}>
                    <span>{this.state.number}</span>
                </div>

                <InputSlider
                    className="slider slider-x absolute-center-vertical"
                    axis="x"
                    x={this.state.number}
                    xmin={this.props.min || undefined}
                    xmax={this.props.max || undefined}
                    xstep={this.props.step || 1}
                    onChange={ this.handleChange }
                />

            </div>
        )
    }
}

export default InputNumberSlider
