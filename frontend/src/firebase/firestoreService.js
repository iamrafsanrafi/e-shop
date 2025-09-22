import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { db } from "./firebaseconfig"

// Function to save product
export const saveProduct = async (product) => {
    try {
        // Refference to "Products" collection
        const productsCollectionRef = collection(db, "Products");

        // Generating a new document with unique ID
        const newProductRef = doc(productsCollectionRef);

        // Adding server timestamp
        const productWithTimestamp = {
            ...product,
            createdAt: serverTimestamp()
        };

        // Saving the product
        await setDoc(newProductRef, productWithTimestamp);

        console.log("Product saved with ID: ", newProductRef.id);
        return newProductRef.id;
    }
    catch (e) {
        console.error(e.message);
    }
}

// Get all products
export const getProducts = async () => {
    try {
        const productsCollectionRef = collection(db, "Products");
        const snapshot = await getDocs(productsCollectionRef);

        const products = snapshot.docs.map(doc => {
            const product = doc.data();
            console.log(product);

            return {
                ...product,
                createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
            };
        })

        return products;
    }
    catch (e) {
        console.error(e.message);
        return [];
    }
}


// Get a specific product
export const getProduct = async (productId) => {
    try {
        const q = query(collection(db, "Products"), where("id", "==", productId));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0].data();

            return {
                ...doc,
                createdAt: doc.createdAt ? doc.createdAt.toDate().getTime() : null
            };
        }
        else {
            console.error("No product found on id: ", productId);
            return;
        }
    }
    catch (e) {
        console.error(e.message);
        return null;
    }
}


// Create a user document
export const createUserDocument = async (user, extraData = {}) => {
    if (!user?.uid) return;

    try {
        const userRef = doc(db, "Users", user.uid);

        await setDoc(userRef, {
            uid: user.uid,
            name: extraData.displayName || null,
            email: user.email || null,
            photoURL: user.photoURL || null,
            cart: [],
            orders: [],
            wishlist: [],
            userType: "normal",
            createdAt: serverTimestamp()
        });

        console.log("User doc created successfully!");
    }
    catch (e) {
        console.error(e.message);
    }
}


// Get user document
export const getUserDocument = async (uid) => {
    try {
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userDoc = userSnap.data();

            return {
                ...userDoc,
                createdAt: userDoc.createdAt ? userDoc.createdAt.toDate().getTime() : null
            };
        }
        else {
            console.warn("No user document found with id: ", uid);
            return null;
        }
    }
    catch (e) {
        console.error(e.message);
        return null;
    }
}


// Update user cart in firestore for each user
export const updateUserCart = async (uid, cart) => {
    try {
        const userRef = doc(db, "Users", uid);
        // Replace the cart field entirely
        await setDoc(
            userRef,
            {
                cart: cart.filter(Boolean),
            },
            { merge: true } // keep other fields like profile, but cart fully replaced
        );
    }
    catch (e) {
        console.error(e.message);
    }
}


// Get user cart data
export const getUserCart = async (uid) => {
    try {
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            return userData.cart || []; // return empty array if cart field doesn't exist
        } else {
            console.warn("User document not found");
            return [];
        }
    } catch (error) {
        console.error("Error fetching user cart:", error);
        return [];
    }
};


// Search products
export const searchProducts = async (keyword) => {
    if(!keyword) return [];

    const productsRef = collection(db, "Products");
    
    const q = query(productsRef, where("title", ">=", keyword), where("title", "<=", keyword + "\uf8ff"))

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().getTime()
    }));
}