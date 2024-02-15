import bannerImg from "../../assests/image/banner-img.png";
import sliderImg from "../../assests/image/slider-bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "./Carousel";

export const Banner: React.FC = () => {
    return ( 
        <section className="flex" id="banner">
            <div className="w-8/12 rounded-lg overflow-hidden drop-shadow-xl" style={{
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: "cover",
            }}>
                <div className="py-11 px-9">
                    <h1 className="font-poppins text-5xl font-medium text-darkBlue-100">Welcome to</h1>
                    <h1 className="font-chewy text-6xl font-medium text-purpleDark-100">Love Chinn</h1>
                    <p className="pt-20 text-3xl w-2/3 font-poppins text-darkBlue-100">A website that was created for my lovely princess !!!</p>
                    <div className="flex mt-7 w-1/2 pb-3 ">
                        <input className="w-3/4 p-2 rounded-md font-poppins text-darkBlue-100 text-sm" placeholder="Find your product..."/>
                        <div className="flex items-center justify-center p-2 px-3 rounded bg-purpleDark-100 ml-4 hover:bg-opacity-85">
                            <button>
                                <FontAwesomeIcon icon={"search"} className="text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/12 flex justify-center items-center ml-3 rounded-lg overflow-hidden drop-shadow-xl" style={{
                backgroundImage: `url(${sliderImg})`,
                backgroundSize: "cover",
            }}> 
                <div className="w-4/5">
                    <Carousel/>
                </div>
            </div>
        </section>
    );
};