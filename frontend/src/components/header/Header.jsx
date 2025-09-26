import BottomPart from "./BottomPart";
import MiddlePart from "./MiddlePart";
import StickyPart from "./StickyPart";
import TopPart from "./TopPart";

const Header = () => {
    return (
        <header>
            <TopPart />
            <MiddlePart />
            <BottomPart />
            <StickyPart />
        </header>
    );
};

export default Header;