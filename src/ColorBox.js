import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

import './styles/ColorBox.css'

class ColorBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false
        }
        this.handleCopyColor = this.handleCopyColor.bind(this);
    }

    handleCopyColor() {
        this.setState(prevState => {
            return { copied: !prevState.copied }
        }, () => {
            setTimeout(() => {
                this.setState(prevState => {
                    return { copied: !prevState.copied }
                })
            }, 1500)
        })


    }

    render() {
        const { name, background, paletteId, id, showLink } = this.props;
        const luminance = chroma(background).luminance()

        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopyColor}>
                <div style={{ background, color: luminance <= 0.25 ? '#fff' : '#000' }} className="ColorBox">
                    <div style={{ background }} className={`copy-overlay ${copied && "show"}`} />
                    <div style={{ color: luminance <= 0.25 ? '#fff' : '#000' }} className={`copy-msg ${copied && "show"}`}>
                        <h1>copied</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-btn">Copy</button>
                        {showLink && (<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => {
                            e.stopPropagation()
                        }}>
                            <span style={{ color: luminance <= 0.25 ? '#fff' : '#000' }} className="see-more">More</span>
                        </Link>)
                        }
                    </div>
                </div>
            </CopyToClipboard>

        )
    }
}

export default ColorBox;