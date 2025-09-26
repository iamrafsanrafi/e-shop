const scrollToSection = (sectionId, options = {}) => {
    const {
        fromNavigation = false,
        onComplete = null,
        retryCount = 0,
        maxRetries = 3
    } = options;

    const getStickyNavHeight = () => {
        const stickyNav = document.getElementById("stickky-nav");

        // If sticky nav not present then assume a fallback height
        if(!stickyNav) {
            return window.innerWidth <= 640 ? 62 : 75;
        }

        // If sticky name is present then use it's actual height
        if(stickyNav.offsetHeight > 0) {
            return stickyNav.offsetHeight;
        }

        // If sticky nav is present but hidden then assume fallback height
        const expectedHeight = window.innerWidth <= 640 ? 62 : 75;
        
        return expectedHeight;
    }

    const performScroll = () => {
        const section = document.getElementById(sectionId);

        // If the section is not present yet then retry
        if(!section) {
            console.warn(`Section with id ${sectionId} not found`);

            if(retryCount < maxRetries) {
                // Retry after a delay
                setTimeout(() => {
                    scrollToSection(sectionId, {...options, retryCount: retryCount + 1})
                }, 100);
            }
            return;
        }

        // Calculate the offset
        const stickyNavHeight = getStickyNavHeight();
        const yOffset = -stickyNavHeight;

        // Get section position
        const sectionRect = section.getBoundingClientRect();
        const absoluteSectionTop = sectionRect.top + window.pageYOffset;
        const finalPosition = absoluteSectionTop + yOffset;

        // Perform smooth scroll
        window.scrollTo({
            top: Math.max(0, finalPosition), // So that we don't scroll to negative position
            behavior: "smooth"
        });

        if(onComplete) {
            setTimeout(onComplete, 300);
        }

        console.log(`Scrolled to section: ${sectionId}, Final position: ${finalPosition}, Sticky nav height: ${stickyNavHeight}`);
    }

    // If the navigation is from other page add delays
    if(fromNavigation) {
        // First dealy for react to mount and render component
        setTimeout(() => {
            requestAnimationFrame(() => {
                // Second delay for proper layout calculations
                setTimeout(() => {
                    performScroll();
                }, 50);
            });
        }, 100);
    }
    else {
        // If not fromNavigation then it's already on the homepage, so scroll immediately
        performScroll();
    }
};

export default scrollToSection;