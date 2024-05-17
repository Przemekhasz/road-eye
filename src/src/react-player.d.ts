declare module 'react-player' {
    import { Component } from 'react';

    interface ReactPlayerProps {
        url: string;
        playing?: boolean;
        controls?: boolean;
        onPause?: () => void;
        onPlay?: () => void;
        onEnded?: () => void;
        width?: string | number;
        height?: string | number;
    }

    export default class ReactPlayer extends Component<ReactPlayerProps> {}
}
