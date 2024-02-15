import Slider from "react-slick";
import { BannerItem } from "./BannerItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNewRelease } from "../../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export const Carousel: React.FC = () => {
    // fetch new release products from server
    const {data: products, isPending, isError, error} = useQuery({
        queryKey: ["products", { type: "newRelease" }],
        queryFn: getNewRelease,
        staleTime: 1000 * 60,
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (isPending) return <div className="flex items-center justify-center">
        <ClipLoader color="#9747FF" />
    </div>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <Slider {...settings}>
            {products.map((product) => (
                <div key={product.id}>
                    <BannerItem  product={product} />
                </div>
            ))}
        </Slider>
    );
};