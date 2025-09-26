import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCategory } from "../slices/productsSlice";

const BlogPage = () => {
    // Redux state
    const { category } = useSelector(state => state.products);

    // Extra hook
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) {
            dispatch(clearCategory());
        }
    }, []);

    // This useEffect scrolls to the top
    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    return (
        <div className="my-10">

        </div>
    );
};

export default BlogPage;