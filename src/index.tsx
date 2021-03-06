import * as React from 'react'
import styles from './styles.css'

interface MagnifierProps {
    imageUrl: string
    largeImageUrl: string
    zoomFactor: number
    imgAlt: string
    glassDimension: number
    glassBorderColor: string
    glassBorderWidth: number
}

interface MousePosition {
    x: number
    y: number
}

enum CursorType {
    NONE = 'none',
    NORMAL = 'normal'
}

export default class Magnifier extends React.PureComponent<MagnifierProps> {
    imgEl: HTMLElement;
    glass: HTMLElement;
    touchMoveListenerAdded: boolean = false

    constructor(props: MagnifierProps) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
    }

    componentDidMount() {
        this.imgEl.addEventListener('mousemove', this.handleMouseMove)
        this.imgEl.addEventListener('touchstart', this.handleTouchStart)
        this.imgEl.addEventListener('touchend', this.handleTouchEnd)
        this.setGlassStyles()
    }

    componentWillUnmount(): void {
      this.imgEl.removeEventListener('mousemove', this.handleMouseMove)
      this.imgEl.removeEventListener('touchmove', this.handleMouseMove)
      this.imgEl.removeEventListener('touchstart', this.handleTouchStart)
      this.imgEl.removeEventListener('touchend', this.handleTouchEnd)
    }

    render(): React.ReactElement {
        return (<div className={styles.container}>
            <img 
                src={this.props.imageUrl}
                alt={this.props.imgAlt}
                ref={(img: HTMLImageElement):void => {
                    this.imgEl = img
                }}
            />
            <div className={styles['magnifying-glass']}
                ref={(glass: HTMLDivElement):void => {
                    this.glass = glass
                }}
            ></div>
        </div>)
    }

    /**
     * Mouse/Touch move handler
     */
    handleMouseMove = (evt: any): void => {
        evt.preventDefault();
        const isTouch = evt.type === 'touchmove' || evt.type === 'touchstart'
        
        this.handleImagePosition(evt as MouseEvent, isTouch)
    }

    /**
     * hides the glass
     */
    removeGlass() {
        window.requestAnimationFrame(() => {
            this.imgEl.style.cursor = CursorType.NORMAL
        })
    }

    /**
     * Position the glass according the pointer position
     * @param evt event
     * @param touch indicates whether is a touch event
     */
    handleImagePosition(evt: any, touch: boolean = false) {
        const target = touch ? evt.targetTouches[0].target : evt.target

        if (target !== this.imgEl) {
            this.removeGlass()
            return
        }


        window.requestAnimationFrame(() => {
            const cursorPosition: MousePosition = {
                x: touch ? evt.targetTouches[0].pageX : evt.pageX,
                y: touch ? evt.targetTouches[0].pageY : evt.pageY
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

    /**
     * touch end event handler
     * @param evt touch event
     */
    handleTouchEnd(evt: TouchEvent) {
        evt.preventDefault()

        this.imgEl.removeEventListener('touchmove', this.handleMouseMove)
        this.touchMoveListenerAdded = false

        this.removeGlass()
        this.glass.style.opacity = '0'
    }

    /**
     * touch start event handler
     * @param evt touch event
     */
    handleTouchStart(evt: TouchEvent) {
        evt.preventDefault()

        if (this.touchMoveListenerAdded) {
            this.imgEl.removeEventListener('touchmove', this.handleMouseMove)
            this.touchMoveListenerAdded = false
        }

        if (evt.targetTouches[0].target !== this.imgEl) {
            this.removeGlass()
            this.glass.style.opacity = '0'
            return
        }

        this.glass.style.opacity = '1'

        this.imgEl.addEventListener('touchmove', this.handleMouseMove)
        this.touchMoveListenerAdded = true
    }

    /**
     * sets glass position and styles
     */
    setGlassStyles() {
        this.glass.style.backgroundImage = `url("${this.props.largeImageUrl}")`
        this.glass.style.height = `${this.props.glassDimension || 150}px`
        this.glass.style.width = `${this.props.glassDimension || 150}px`
        this.glass.style.borderColor = this.props.glassBorderColor || '#be9a35'
        this.glass.style.borderWidth = `${this.props.glassBorderWidth || 8}px`
    }
}