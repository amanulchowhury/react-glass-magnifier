import * as React from 'react';
import './styles.css';

interface MagnifierProps {
    imageUrl: string;
    largeImageUrl: string;
    zoomFactor: number;
    imgAlt: string;
    glassHeight: number
    glassWidth: number
}

interface MagnifierState {
    imgStyles: object;
    glassStyles: object;
}

interface MousePosition {
    x: number;
    y: number;
}

enum CursorType {
    NONE = 'none',
    NORMAL = 'normal'
}

export default class Magnifier extends React.PureComponent<MagnifierProps, MagnifierState> {
    imgEl: HTMLElement | undefined;
    glass: HTMLElement | undefined;
    state: Readonly<MagnifierState> = {
        imgStyles: {
            cursor: CursorType.NORMAL
        },
        glassStyles: {
            opacity: '0',
            backgroundImage: `url("${this.props.largeImageUrl}")`,
            backgroundSize: '0px 0px',
            backgroundPosition: '0px 0px',
            left: 0,
            top: 0,
            height: `${this.props.glassHeight}px`,
            width: `${this.props.glassWidth}px`,
            borderRadius: '50%',
            border: '8px solid #be9a35'
        }
    }

    constructor(props: MagnifierProps) {
        super(props);

        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount(): void {
        document.removeEventListener('mousemove', this.handleMouseMove)
    }

    handleMouseMove(evt: MouseEvent): void {
        evt.preventDefault();

        if(evt.target !== this.imgEl) {
            this.setState({
                glassStyles: {...this.state.glassStyles, opacity: '0'}
            })
            return;
        }

        this.setState({
            imgStyles: {
                cursor: CursorType.NONE
            }
        })

        const cursorPosition: MousePosition = {
            x: evt.pageX,
            y: evt.pageY
        }

        if(this.glass) {
            const imgRect: ClientRect = this.imgEl.getBoundingClientRect()
            const glassOffset: number = this.glass.offsetWidth / 2
            const bgrLeft: number = 
                (this.props.zoomFactor * (cursorPosition.x - imgRect.left)) - glassOffset
            const bgrTop: number = 
                (this.props.zoomFactor * (cursorPosition.y - imgRect.top)) - glassOffset

            this.setState({
                glassStyles: {
                    ...this.state.glassStyles,
                    opacity: '1',
                    left: `${(cursorPosition.x - glassOffset)}px`,
                    top: `${(cursorPosition.y - glassOffset)}px`,
                    backgroundPosition: `${-bgrLeft}px ${-bgrTop}px`,
                    backgroundSize: `${(this.props.zoomFactor * imgRect.width)}px ${(this.props.zoomFactor * imgRect.height)}px`
                }
            })
        }
    }

    render(): React.ReactElement {
        return (<div className="container">
            <img 
                src={this.props.imageUrl}
                alt={this.props.imgAlt}
                ref={(img: HTMLImageElement):void => {
                    this.imgEl = img;
                }}
                style={this.state.imgStyles}
            />
            <div className="magnifying-glass"
                ref={(glass: HTMLDivElement):void => {
                    this.glass = glass;
                }}
                style={this.state.glassStyles}
            ></div>
        </div>)
    }
}