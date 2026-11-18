import { useEffect, useRef, useState } from "react";
import { CardPetLove } from "../../../components/CardPetLove/CardPetLove";
import { UIKitCarouselPagination } from "../../../components/UIKit";

type HomePetloveTeamProps = {
    title: string
    images: { url: string; alt: string }[]
}

function getPageOffset(track: HTMLDivElement, page: number, slidesPerPage: number) {
    const firstSlide = track.children.item(page * slidesPerPage);
    if (!(firstSlide instanceof HTMLElement)) {
        return 0;
    }

    const trackBounds = track.getBoundingClientRect();
    const slideBounds = firstSlide.getBoundingClientRect();
    const offset = track.scrollLeft + slideBounds.left - trackBounds.left;
    return Math.min(Math.max(0, offset), track.scrollWidth - track.clientWidth);
}

function HomePetloveTeam({ images, title }: HomePetloveTeamProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const slidesPerPageRef = useRef(4);
    const [slidesPerPage, setSlidesPerPage] = useState(4);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = Math.ceil(images.length / slidesPerPage);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            const cssSlidesPerPage = Number.parseInt(
                getComputedStyle(track).getPropertyValue("--home-family-slides-per-page"),
                10,
            );
            const nextSlidesPerPage = Number.isFinite(cssSlidesPerPage) && cssSlidesPerPage > 0
                ? cssSlidesPerPage
                : 1;

            if (nextSlidesPerPage !== slidesPerPageRef.current) {
                slidesPerPageRef.current = nextSlidesPerPage;
                track.scrollTo({ left: 0 });
                setCurrentSlide(0);
                setSlidesPerPage(nextSlidesPerPage);
            }
        });

        resizeObserver.observe(track);
        return () => resizeObserver.disconnect();
    }, []);

    function changeSlide(slide: number) {
        const track = trackRef.current;
        if (!track) {
            return;
        }

        setCurrentSlide(slide);
        track.scrollTo({
            left: getPageOffset(track, slide, slidesPerPage),
            behavior: "smooth",
        });
    }

    function updateCurrentSlide() {
        const track = trackRef.current;
        if (!track || totalSlides === 0) {
            return;
        }

        let closestSlide = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        for (let slide = 0; slide < totalSlides; slide += 1) {
            const distance = Math.abs(
                track.scrollLeft - getPageOffset(track, slide, slidesPerPage),
            );
            if (distance < closestDistance) {
                closestSlide = slide;
                closestDistance = distance;
            }
        }

        setCurrentSlide((previousSlide) => (
            previousSlide === closestSlide ? previousSlide : closestSlide
        ));
    }

    return (
        <div className="home__family-inner">
            <h2 className="home__section-title">{title}</h2>
            <div
                className="home__family-grid"
                ref={trackRef}
                onScroll={updateCurrentSlide}
            >
                {images.map(({ url, alt }) => (
                    <CardPetLove key={url} urlImagen={url} alt={alt} />
                ))}
            </div>
            <UIKitCarouselPagination
                totalSlides={totalSlides}
                currentSlide={currentSlide}
                onSlideChange={changeSlide}
                size="md"
                colorScheme="secondary"
                className="home__family-pagination"
            />
        </div>
    )
}

export default HomePetloveTeam;