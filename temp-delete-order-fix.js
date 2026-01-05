// Temporary file to hold the corrected deleteOrder function
// This will be manually copied into the order details page

const deleteOrder = async () => {
    // Confirm before deleting
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
        return;
    }

    try {
        console.log("Deleting order:", order?.id);

        // First, delete all order products for this order
        const orderProductsResponse = await apiClient.delete(`/api/order-product/${order?.id}`);

        // Check if deletion was successful
        if (!orderProductsResponse.ok) {
            const errorData = await orderProductsResponse.json().catch(() => ({ error: "Unknown error" }));
            console.error("Failed to delete order products:", errorData);
            toast.error(errorData.error || "Failed to delete order products");
            return; // Stop here if order products deletion failed
        }

        console.log("Order products deleted successfully");

        // Then delete the order itself
        const orderResponse = await apiClient.delete(`/api/orders/${order?.id}`);

        // Check if deletion was successful
        if (!orderResponse.ok) {
            const errorData = await orderResponse.json().catch(() => ({ error: "Unknown error" }));
            console.error("Failed to delete order:", errorData);
            toast.error(errorData.error || "Failed to delete order");
            return; // Stop here if order deletion failed
        }

        console.log("Order deleted successfully from database");
        toast.success("Order deleted successfully");
        router.push("/admin/orders");
    } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order. Please try again.");
    }
};
