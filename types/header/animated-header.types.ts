/**
 * Interface for the animated header component
 */
interface AnimatedHeaderProps {
    /** A function to hide the animated header */
    hideAnimatedHeader: () => void; 
    
    /** A state property for tracking the animation for the animated header */
    animatingOut: boolean;

    /** Track the scroll direction */
    scrollDirection: string | null;
}

export default AnimatedHeaderProps;