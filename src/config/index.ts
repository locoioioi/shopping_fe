import { QueryClient } from '@tanstack/react-query';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faSearch, faShoppingCart, faDiamond, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
export const queryClient = new QueryClient();

library.add(faShoppingCart, faHeart, faSearch,faDiamond,faCaretRight, faCaretLeft, faFacebook);
