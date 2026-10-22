import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// icons
import { MdArrowForward, MdVerifiedUser } from "react-icons/md";

// components
import Badge from "../Badge";
import Button from "../Button";
import Image from "../media/Image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// hooks
import { useCurrentUser } from '../../hooks/useAuth';


const Hero = () => {

    const { data: user, isLoading } = useCurrentUser();

    // slides
    const slides = [
        {
            image: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512277/home_1_nes6hq.png",
            badge: "WELCOME TO AUTHIFY",
            title: "Your Security,",
            highlight: "Our Priority.",
            description: "Experience secure and seamless authentication with a simple, reliable way to access your account.",
        },
        {
            image: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512276/home_2_hspwhf.png",
            badge: "SIMPLE & SECURE",
            title: "Your Account,",
            highlight: "Your Control.",
            description: "Manage your account with ease and enjoy a smooth authentication experience built around you.",
        },
        {
            image: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512279/home_3_xzw2hg.png",
            badge: "PROTECT YOUR IDENTITY",
            title: "Privacy Comes",
            highlight: "First.",
            description: "Access your account with confidence and make security part of your everyday digital experience.",
        },
        {
            image: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512281/home_4_xjruxz.png",
            badge: "A BETTER EXPERIENCE",
            title: "Simple Access,",
            highlight: "Less Effort.",
            description: "Enjoy a clean, user-friendly experience that makes signing in and managing your account effortless.",
        },
        {
            image: "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512283/home_5_rtwlvr.png",
            badge: "GET STARTED TODAY",
            title: "Your Journey",
            highlight: "Starts Here.",
            description: "Create your Authify account and get started with a simple and convenient authentication experience.",
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-green-50">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop
                speed={800}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="authify-hero-swiper w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.image}>
                        <div className="relative min-h-130 w-full sm:min-h-140 md:min-h-150 lg:min-h-155 xl:min-h-screen">
                            {/* Background Image */}
                            <Image
                                src={slide?.image}
                                alt={`Authify slide ${index + 1}`}
                                className="absolute inset-0 h-full w-full object-cover object-center"
                            />

                            {/* Responsive Overlay */}
                            <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/55 to-transparent" />

                            {/* Content Container */}
                            <div className="relative z-10 mx-auto flex min-h-130 max-w-7xl items-center px-5 py-14 sm:min-h-140 sm:px-8 sm:py-16 md:min-h-150 lg:min-h-155 lg:px-12 xl:min-h-170">
                                <div className="w-full max-w-xl">
                                    {/* Reusable Badge */}
                                    <div className="mb-5 sm:mb-6">
                                        <Badge variant="success" size="sm" appearance="soft">
                                            <MdVerifiedUser size={16} />
                                            {slide.badge}
                                        </Badge>
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 min-[400px]:text-4xl sm:text-5xl sm:leading-tight lg:text-6xl xl:text-7xl">
                                        {slide.title}
                                        <span className="mt-1 block text-green-700">
                                            {slide.highlight}
                                        </span>
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                                        {slide.description}
                                    </p>

                                    {/* Action Buttons */}
                                    {!isLoading && (
                                        !user && (
                                            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                                                <Link to="/register" className="inline-flex">
                                                    <Button variant="success" className="gap-2" icon={MdArrowForward} iconPosition="end" text="Get Started" />
                                                </Link>

                                                <Link to="/login" className="inline-flex">
                                                    <Button variant="themeOutline" text="Login" />
                                                </Link>
                                            </div>
                                        )
                                    )}

                                    {/* Supporting Text */}
                                    <div className="mt-5 flex items-center gap-2 text-xs text-gray-600 sm:mt-6 sm:text-sm">
                                        <MdVerifiedUser size={19} className="shrink-0 text-green-700" />
                                        <span>Simple, secure and reliable access</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Styling */}
            <style>{`
                .authify-hero-swiper .swiper-pagination {
                    bottom: 16px !important;
                    padding: 0 12px;
                }

                .authify-hero-swiper .swiper-pagination-bullet {
                    width: 7px;
                    height: 7px;
                    margin: 0 4px !important;
                    background: #15803d;
                    opacity: 0.4;
                    transition: all 0.3s ease;
                }

                .authify-hero-swiper .swiper-pagination-bullet-active {
                    width: 22px;
                    border-radius: 999px;
                    opacity: 1;
                }

                .authify-hero-swiper .swiper-slide {
                    height: auto;
                    overflow: hidden;
                }

                @media (min-width: 640px) {
                    .authify-hero-swiper .swiper-pagination {
                        bottom: 20px !important;
                    }

                    .authify-hero-swiper .swiper-pagination-bullet {
                        width: 8px;
                        height: 8px;
                    }

                    .authify-hero-swiper .swiper-pagination-bullet-active {
                        width: 25px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .authify-hero-swiper .swiper-pagination-bullet {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;