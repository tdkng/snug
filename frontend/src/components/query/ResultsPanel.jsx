// swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper styles
import 'swiper/css';
import { FreeMode, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const ResultsPanel = () => {
    return (
        <div className='px-4 rounded-md relative mx-auto h-[calc(100vh-160px)] w-full'>
            <Swiper className='bg-brown h-full'
                direction="vertical"
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel, Navigation, Pagination, Scrollbar]}
                navigation={{nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}}
                pagination={{ clickable: true }}
                scrollbar={{ hide: false }}
                slidesPerView={4}
                spaceBetween={16}
            >
                <SwiperSlide className="bg-gray-200 rounded">Slide 1</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 2</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 3</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 4</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 5</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 6</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 7</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 8</SwiperSlide>
                <SwiperSlide className="bg-gray-200 rounded">Slide 9</SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ResultsPanel;