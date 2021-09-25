import { useMediaQuery } from 'react-responsive';

function useScreenSize(screenTypes = ['mobile', 'tablet', 'desktop']) {
    const isMobile = useMediaQuery({ minWidth: '280px' });
    const isTablet = useMediaQuery({ minWidth: '600px' });
    const isDesktop = useMediaQuery({ minWidth: '1024px' });
    // const isLandscape = useMediaQuery({ orientation: 'landscape' });

    if (isDesktop) return screenTypes[2];
    else if (isTablet) return screenTypes[1];
    else return screenTypes[0];
}

export default useScreenSize;
