import React from 'react'
import { SketchPicker } from 'react-color'

class InputColor extends React.Component {

    state = {
        displayColorPicker: false,
        color: "#fff"
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

    handleChange = (color) => {
        this.setState({ color: color.hex })
        this.props.input.onChange({
            target: {
                name: this.props.input.name,
                value: color.hex
            }
        })
    }

    componentWillMount(){

        let { defaultValue, forceValue } = this.props
        this.setState({ color: forceValue || (defaultValue || "#fff") })
    }

    componentWillReceiveProps(nextProps){

        let { defaultValue, forceValue } = nextProps
        this.setState({ color: forceValue || (defaultValue || "#fff") })
    }

    render() {

        const styles = {
            color: {
                width: '100%',
                height: '20px',
                borderRadius: '3px',
                background: this.state.color
            },
            swatch: {
                width: '100%',
                padding: '3px',
                background: '#fff',
                borderRadius: '3px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        }

        return (
            <div>
                <input
                    {...this.props.input}
                    className="form-control hidden"
                    type="text"
                    value={ this.state.color || undefined }
                />

                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>

                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker
                        onChange={ this.handleChange }
                        color={ this.state.color }
                    />

                </div> : null }

                </div>
        )
    }
}

export default InputColor
