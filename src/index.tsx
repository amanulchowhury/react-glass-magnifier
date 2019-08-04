import * as React from 'react';
import styles from './styles.css';

interface MagnifierProps {
    imageUrl: string;
    largeImageUrl: string;
    zoomFactor: number;
    imgAlt: string;
    glassHeight: number
    glassWidth: number
}

interface MousePosition {
    x: number;
    y: number;
}

enum CursorType {
    NONE = 'none',
    NORMAL = 'normal'
}

export default class Magnifier extends React.PureComponent<MagnifierProps> {
    imgEl: HTMLElement;
    glass: HTMLElement;
    
    handleMouseMove = (evt: MouseEvent): void => {
        evt.preventDefault();

        if (evt.target !== this.imgEl) {
            window.requestAnimationFrame(() => {
                this.imgEl.style.cursor = CursorType.NORMAL
            })
            return
        }

        window.requestAnimationFrame(() => {
            const cursorPosition: MousePosition = {
                x: evt.pageX,
                y: evt.pageY
            }
            const imgRect: ClientRect = this.imgEl.getBoundingClientRect()
            const glassOffset: number = this.glass.offsetWidth / 2
            const bgrLeft: number = 
                (this.props.zoomFactor * (cursorPosition.x - imgRect.left)) - glassOffset
            const bgrTop: number = 
                (this.props.zoomFactor * (cursorPosition.y - imgRect.top)) - glassOffset

            this.imgEl.style.cursor = CursorType.NONE
    
            this.glass.style.left = `${(cursorPosition.x - glassOffset)}px`
            this.glass.style.top = `${(cursorPosition.y - glassOffset)}px`
            this.glass.style.backgroundPosition =`${-bgrLeft}px ${-bgrTop}px`
            this.glass.style.backgroundSize = 
              `${(this.props.zoomFactor * imgRect.width)}px ${(this.props.zoomFactor * imgRect.height)}px`
        })
    }

    constructor(props: MagnifierProps) {
        super(props);
    }

    componentDidMount() {
        this.imgEl.addEventListener('mousemove', this.handleMouseMove)
        this.glass.style.backgroundImage = `url("${this.props.largeImageUrl}")`
        this.glass.style.height = `${this.props.glassHeight}px`
        this.glass.style.width = `${this.props.glassWidth}px`
    }

    componentWillUnmount(): void {
      this.imgEl.removeEventListener('mousemove', this.handleMouseMove)
    }

    render(): React.ReactElement {
        return (<div className={styles.container}>
            <img 
                src={this.props.imageUrl}
                alt={this.props.imgAlt}
                ref={(img: HTMLImageElement):void => {
                    this.imgEl = img;
                }}
            />
            <div className={styles['magnifying-glass']}
                ref={(glass: HTMLDivElement):void => {
                    this.glass = glass;
                }}
            ></div>
        </div>)
    }
}