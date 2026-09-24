// Razorpay SDK sirf tab load hota hai jab user payment karta hai
let loading = null;

export const loadRazorpay = () => {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve(true);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      loading = null;
      reject(new Error("Razorpay SDK load nahi hua"));
    };
    document.body.appendChild(script);
  });

  return loading;
};