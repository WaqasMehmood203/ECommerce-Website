import { WishlistModule } from "@/components/modules/wishlist";

export const metadata = {
    title: "My Wishlist | UniCart",
    description: "View and manage your favourite products",
};

export default function WishlistPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-screen-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    My Wishlist
                </h1>
                <WishlistModule />
            </div>
        </main>
    );
}
