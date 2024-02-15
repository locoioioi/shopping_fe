import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assests/image/logo.png"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
export const Footer: React.FC = () => {
    return <div className="mt-16 mb-4">
        <div className="p-[2px] mb-10 rounded-lg bg-darkBlue-100">
        </div>
        <div className="flex flex-row">
            <div className="w-3/12">
                <div className="px-1">
                    <img src={logo} className="w-1/2" alt="" />
                    <p className="font-poppins text-darkBlue-100 mt-2">I wish you like this little gift that I prepared for you in the sem break. I just want to say that I love you soo much</p>
                    <div className="flex flex-row gap-2 mt-3">
                        <a href="https://www.facebook.com/profile.php?id=100011623091896" >
                            <FontAwesomeIcon icon={faFacebook} className="text-darkBlue-100 text-2xl" />
                        </a>
                        <a href="https://www.instagram.com/truong.locc/">
                            <FontAwesomeIcon icon={faInstagram} className="text-darkBlue-100 text-2xl"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-2/12">
                <div className="flex flex-col ml-10">
                    <h2 className="font-poppins text-xl font-bold text-darkBlue-100">Product</h2>
                    <ul className="mt-4">
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Chill</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Loc</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Fashion</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Accessories</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Foods</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Beauty</li>
                    </ul>
                </div>
            </div>

            <div className="w-2/12">
                <div className="flex flex-col ml-10">
                    <h2 className="font-poppins text-xl font-bold text-darkBlue-100">Company</h2>
                    <ul className="mt-4">
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Loc</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Love</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Trinh</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Super</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Very</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">A lot</li>
                    </ul>
                </div>
            </div>

            <div className="w-2/12">
                <div className="flex flex-col ml-10">
                    <h2 className="font-poppins text-xl font-bold text-darkBlue-100">Support</h2>
                    <ul className="mt-4">
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Getting started</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Help center</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Boyfriend status</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Report for a kiss</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Chat support</li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm">Love you</li>
                    </ul>
                </div>
            </div>

            <div className="w-3/12">
                <div className="flex flex-col ml-10">
                    <h2 className="font-poppins text-xl font-bold text-darkBlue-100">Contact me</h2>
                    <ul className="mt-4">
                        <li className="mt-2 text-stone-500 font-poppins text-sm flex flex-row items-center gap-1">
                                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                                <p>baoloctruongquang@gmail.com</p>
                        </li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm flex flex-row items-center gap-1">
                                <FontAwesomeIcon icon={faPhone} className="text-sm" />
                                <p>(+84) 903935804</p>
                        </li>
                        <li className="mt-2 text-stone-500 font-poppins text-sm flex flex-row items-center gap-1">
                                <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                                <p>Trong tim Chin</p>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
};