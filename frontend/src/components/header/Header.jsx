import BottomPart from "./BottomPart";
import MiddlePart from "./MiddlePart";
import StickyPart from "./StickyPart";

const Header = () => {
    return (
        <header>
            <MiddlePart />
            <BottomPart />
            <StickyPart />
        </header>
    );
};

export default Header;